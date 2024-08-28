import streamlit as st
from streamlit_webrtc import webrtc_streamer 
import av
import cv2 
import numpy as np 
import mediapipe as mp 
from keras.models import load_model
import webbrowser

css = """
<style>
    /* Background gradient for the main app container */
    .stApp {
        background-image: linear-gradient(135deg, #FF85DD 0%, #5A90E2 100%);
        color: #ffffff;  /* White text for better readability */
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; /* Modern, sans-serif font for the app */
    }

    /* Centered and styled header */
    h1 {
        text-align: center;  /* Center alignment for the title */
        color: #ffffff;  /* White color for the title */
         /* Elegant, serif font for the title */
        font-size: 3em;  /* Large font size for prominence */
    }

    /* Standard styling for input fields */
    .stTextInput>div>div>input {
       color: #4A00E0;
        background-color: #ffffff;  /* White background for contrast */
        border-radius: 5px;  /* Slightly rounded corners for aesthetics */
        border: 1px solid #cccccc;  /* Light grey border, subtle and standard */
          /* Comfortable padding inside the input */
        font-size: 18px;  /* Larger font size for better readability */
        display: block;
         /* Standard width, not too wide */
          /* Centering the input field horizontally */
    }

    /* Enhanced button appearance */
    .stButton>button {
        color: #ffffff;  /* White text */
        background-color: #4A90E2;  /* Blue background */
        border-radius: 5px;  /* Rounded corners */
        padding: 10px 24px;  /* Adequate padding for clickability */
        font-size: 16px;  /* Standard font size */
        display: block;
        width: 30%;  /* Standard button width */
        margin: 0 auto 20px;  /* Center and add space below */
        transition: background-color 0.3s;  /* Smooth transition for hover effect */
    }

    .stButton>button:hover {
        background-color: #3677b8;  /* Darker blue on hover */
    }

    /* Remove video frame borders if applicable */
    .stVideo, .stVideo iframe {
        border: none !important;
    }
</style>
"""

st.markdown(css, unsafe_allow_html=True)

st.title("Emotify Web Scan")
model  = load_model("model1.h5")
label = np.load("labels1.npy")
holistic = mp.solutions.holistic
hands = mp.solutions.hands
holis = holistic.Holistic()
drawing = mp.solutions.drawing_utils

# st.header("Emotify web scan")

if "run" not in st.session_state:
	st.session_state["run"] = "true"
try:
	emotion = np.load("emotion.npy")[0]
except:
	emotion=""
 
if not(emotion):
	st.session_state["run"] = "true"
else:
	st.session_state["run"] = "false"

class EmotionProcessor:
	def recv(self, frame):
		frm = frame.to_ndarray(format="bgr24")

		frm = cv2.flip(frm, 1)

		res = holis.process(cv2.cvtColor(frm, cv2.COLOR_BGR2RGB))

		lst = []

		if res.face_landmarks:
			for i in res.face_landmarks.landmark:
				lst.append(i.x - res.face_landmarks.landmark[1].x)
				lst.append(i.y - res.face_landmarks.landmark[1].y)

			if res.left_hand_landmarks:
				for i in res.left_hand_landmarks.landmark:
					lst.append(i.x - res.left_hand_landmarks.landmark[8].x)
					lst.append(i.y - res.left_hand_landmarks.landmark[8].y)
			else:
				for i in range(42):
					lst.append(0.0)

			if res.right_hand_landmarks:
				for i in res.right_hand_landmarks.landmark:
					lst.append(i.x - res.right_hand_landmarks.landmark[8].x)
					lst.append(i.y - res.right_hand_landmarks.landmark[8].y)
			else:
				for i in range(42):
					lst.append(0.0)

			lst = np.array(lst).reshape(1,-1)

			pred = label[np.argmax(model.predict(lst))]

			print(pred)
			cv2.putText(frm, pred, (50,50),cv2.FONT_ITALIC, 1, (255,0,0),2)

			np.save("emotion.npy", np.array([pred]))

			
		drawing.draw_landmarks(frm, res.face_landmarks, holistic.FACEMESH_TESSELATION,
								landmark_drawing_spec=drawing.DrawingSpec(color=(0,0,255), thickness=-1, circle_radius=1),
								connection_drawing_spec=drawing.DrawingSpec(thickness=1))
		drawing.draw_landmarks(frm, res.left_hand_landmarks, hands.HAND_CONNECTIONS)
		drawing.draw_landmarks(frm, res.right_hand_landmarks, hands.HAND_CONNECTIONS)

		return av.VideoFrame.from_ndarray(frm, format="bgr24")


webrtc_streamer(key="key", desired_playing_state=True, video_processor_factory=EmotionProcessor)
lang = st.text_input("Language")
singer = st.text_input("Singer")
btn = st.button("Recommend me songs")


if btn:
    if not (emotion):
        st.warning("Please let me capture you")
        st.session_state["run"] = "true"
    elif(emotion=="happy"):
        webbrowser.open(f"http://localhost:3000?mood={lang}+{singer}+happy+songs")
        np.save("emotion.npy", np.array([""]))
        st.session_state["run"]= "false"
    elif(emotion=="sad"):
        webbrowser.open(f"http://localhost:3000?mood={lang}+{singer}+sad+songs")
        np.save("emotion.npy", np.array([""]))
        st.session_state["run"]= "false"
    elif(emotion=="neutral"):
        webbrowser.open(f"http://localhost:3000?mood={lang}+{singer}+neutral+songs")
        np.save("emotion.npy", np.array([""]))
        st.session_state["run"]= "false"
    elif(emotion=="angry"):
        webbrowser.open(f"http://localhost:3000?mood={lang}+{singer}+angry+songs")
        np.save("emotion.npy", np.array([""]))
        st.session_state["run"]= "false"        
    else:
        webbrowser.open(f"http://localhost:3000?mood={lang}+{singer}+happy+songs")
        np.save("emotion.npy", np.array([""]))
        st.session_state["run"]= "false"
	
