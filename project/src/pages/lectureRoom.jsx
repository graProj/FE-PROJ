import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { io } from "socket.io-client";
import Student from '../components/lecture/student';
import Chat from '../components/lecture/chat';
const VideoContainer = styled.video`
	width: 240px;
	height: 240px;
	background-color: black;
`;

const UserLabel = styled.p`
	display: inline-block;
	position: absolute;
	top: 230px;
	left: 0px;
`;
const Video = ({ email, stream, muted } ) => {
	const ref = useRef<HTMLVideoElement>(null);
	const [isMuted, setIsMuted] = useState(false);

	useEffect(() => {
		if (ref.current) ref.current.srcObject = stream;
		if (muted) setIsMuted(muted);
	}, [stream, muted]);

	return (
		<div>
			<VideoContainer ref={ref} muted={isMuted} autoPlay />
			<UserLabel>{email}</UserLabel>
		</div>
	);
};
const LectureRoom = () => {
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const pc_config = {
    iceServers: [
        // {
        //   urls: 'stun:[STUN_IP]:[PORT]',
        //   'credentials': '[YOR CREDENTIALS]',
        //   'username': '[USERNAME]'
        // },
        {
            urls: 'stun:stun.l.google.com:19302',
        },
    ],
};
  const SOCKET_SERVER_URL = 'http://localhost:8080';
  const socketRef = useRef();
  const pcsRef = useRef({});
  const localVideoRef = useRef(null);
  const localStreamRef = useRef();
  const [users, setUsers] = useState([]);

  const getLocalStream = useCallback(async () => {
      try {
          const localStream = await navigator.mediaDevices.getUserMedia({
              audio: true,
              video: {
                  width: 240,
                  height: 240,
              },
          });
          localStreamRef.current = localStream;
          if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
          if (!socketRef.current) return;
          socketRef.current.emit('join_room', {
              room: '1234',
              email: 'sample@naver.com',
          });
      } catch (e) {
          console.log(`getUserMedia error: ${e}`);
      }
  }, []);

  const createPeerConnection = useCallback((socketID, email) => {
      try {
          const pc = new RTCPeerConnection(pc_config);

          pc.onicecandidate = (e) => {
              if (!(socketRef.current && e.candidate)) return;
              console.log('onicecandidate');
              socketRef.current.emit('candidate', {
                  candidate: e.candidate,
                  candidateSendID: socketRef.current.id,
                  candidateReceiveID: socketID,
              });
          };

          pc.oniceconnectionstatechange = (e) => {
              console.log(e);
          };

          pc.ontrack = (e) => {
              console.log('ontrack success');
              setUsers((oldUsers) =>
                  oldUsers
                      .filter((user) => user.id !== socketID)
                      .concat({
                          id: socketID,
                          email,
                          stream: e.streams[0],
                      }),
              );
          };

          if (localStreamRef.current) {
              console.log('localstream add');
              localStreamRef.current.getTracks().forEach((track) => {
                  if (!localStreamRef.current) return;
                  pc.addTrack(track, localStreamRef.current);
              });
          } else {
              console.log('no local stream');
          }

          return pc;
      } catch (e) {
          console.error(e);
          return undefined;
      }
  }, []);

  useEffect(() => {
      socketRef.current = io.connect(SOCKET_SERVER_URL);
      getLocalStream();

      socketRef.current.on('all_users', (allUsers) => {
          allUsers.forEach(async (user) => {
              if (!localStreamRef.current) return;
              const pc = createPeerConnection(user.id, user.email);
              if (!(pc && socketRef.current)) return;
              pcsRef.current = { ...pcsRef.current, [user.id]: pc };
              try {
                  const localSdp = await pc.createOffer({
                      offerToReceiveAudio: true,
                      offerToReceiveVideo: true,
                  });
                  console.log('create offer success');
                  await pc.setLocalDescription(new RTCSessionDescription(localSdp));
                  socketRef.current.emit('offer', {
                      sdp: localSdp,
                      offerSendID: socketRef.current.id,
                      offerSendEmail: 'offerSendSample@sample.com',
                      offerReceiveID: user.id,
                  });
              } catch (e) {
                  console.error(e);
              }
          });
      });

      socketRef.current.on(
          'getOffer',
          async (data) => {
              const { sdp, offerSendID, offerSendEmail } = data;
              console.log('get offer');
              if (!localStreamRef.current) return;
              const pc = createPeerConnection(offerSendID, offerSendEmail);
              if (!(pc && socketRef.current)) return;
              pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };
              try {
                  await pc.setRemoteDescription(new RTCSessionDescription(sdp));
                  console.log('answer set remote description success');
                  const localSdp = await pc.createAnswer({
                      offerToReceiveVideo: true,
                      offerToReceiveAudio: true,
                  });
                  await pc.setLocalDescription(new RTCSessionDescription(localSdp));
                  socketRef.current.emit('answer', {
                      sdp: localSdp,
                      answerSendID: socketRef.current.id,
                      answerReceiveID: offerSendID,
                  });
              } catch (e) {
                  console.error(e);
              }
          },
      );

      socketRef.current.on(
          'getAnswer',
          (data) => {
              const { sdp, answerSendID } = data;
              console.log('get answer');
              const pc = pcsRef.current[answerSendID];
              if (!pc) return;
              pc.setRemoteDescription(new RTCSessionDescription(sdp));
          },
      );

      socketRef.current.on(
          'getCandidate',
          async (data) => {
              console.log('get candidate');
              const pc = pcsRef.current[data.candidateSendID];
              if (!pc) return;
              await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
              console.log('candidate add success');
          },
      );

      socketRef.current.on('user_exit', (data) => {
          if (!pcsRef.current[data.id]) return;
          pcsRef.current[data.id].close();
          delete pcsRef.current[data.id];
          setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
      });

      return () => {
          if (socketRef.current) {
              socketRef.current.disconnect();
          }
          users.forEach((user) => {
              if (!pcsRef.current[user.id]) return;
              pcsRef.current[user.id].close();
              delete pcsRef.current[user.id];
          });
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createPeerConnection, getLocalStream]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  
  return (
    <Container>
      <ProfessorContainer>
        <h2>교수 화면</h2>
        <ProfessorVideo muted
          ref={localVideoRef}
          autoPlay width="100%" height="100%"></ProfessorVideo>
      </ProfessorContainer>
      <GridContainer>
        <h2>학생 화면</h2>
        {users.map((user, index) => (
                <Video key={index} email={user.email} stream={user.stream} />
            ))}
      </GridContainer>
      <ChatContainer>
        <ChatButton onClick={toggleChat}>{isChatOpen ? "채팅 비활성화":"채팅 활성화"}</ChatButton>
        <ChatBox isopen={isChatOpen}>
          <Chat/>
        </ChatBox>
      </ChatContainer>
    </Container>
  );
};

export default LectureRoom;

const Container = styled.div`
  display: flex;
`;

const ProfessorContainer = styled.div`
  flex: 1;
  padding: 20px;
  border: 1px solid black;
`;

const GridContainer = styled.div`
  flex: 3;
  padding: 20px;
`;

const ChatContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const ProfessorVideo = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
  border-radius: 1px solid black;
`;

const ChatButton = styled.button`
  color: black;
  border: black;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const ChatBox = styled.div`
  display: ${({ isopen }) => (isopen ? 'block' : 'none')};
  border: 1px solid black;
`;
