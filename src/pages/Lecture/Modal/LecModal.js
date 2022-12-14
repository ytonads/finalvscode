import { useDispatch } from "react-redux";
import { useEffect, useRef , useState } from "react";
import { useParams } from "react-router-dom";
import LecModalCSS from './LectureRegistModal.module.css';
import React from 'react';
import ReactPlayer from 'react-player'
import Swal from 'sweetalert2'
import { 
    callCourseHistoryAPI
    // callCourseHistoryUpdateAPI
    } from '../../../apis/LectureApiCalls';



function LecModal({savedRoute, lectureWeekCode, setLecModal}) {

    
    console.log("savedRoute = ", savedRoute)
    const videoRef = useRef();
    const dispatch = useDispatch();



    //반환할 palayed 폼
    const [form, setForm] = useState({
            lectureWeekCode: 0,
            courseTime: 0,
            courseStatus: ''
    });
    


    //모달창 닫기 버튼 핸들러
    const closeModalHandler = () => {

        //현재 재생 시점 시간
        const currentTime = 
        videoRef && videoRef.current ? videoRef.current.getCurrentTime() : 0;
        const newCurrentTime = currentTime.toFixed(0);  //밀리초 -> 초
        
        //영상의 총 시간
        const duration =
        videoRef && videoRef.current ? videoRef.current.getDuration() : 0;
        
        //해당 문자열을 넣기 위한 선언
        const ing = "진행중";
        const success = "완료";

        console.log("현재 재생 시간(초) = ", newCurrentTime);
        console.log("영상의 총 시간(초) = ", duration);

        const formData = new FormData();

        if(duration !== currentTime){
            formData.append("courseTime", newCurrentTime);
            formData.append("courseStatus", ing);
            formData.append("lectureWeek.lectureWeekCode", lectureWeekCode)
        } else if(duration === currentTime){
            formData.append("courseTime", newCurrentTime);
            formData.append("courseStatus", success);
            formData.append("lectureWeek.lectureWeekCode", lectureWeekCode)
        }

        // API 통신으로 보내기
        dispatch(callCourseHistoryAPI({
            form : formData
        }));

        
        //모달 닫기
        setLecModal(false)

        //알럿 및 새로고침
        Swal.fire({
		  title: '강의 종료',
		  text: "시청중인 강의가 종료됩니다.",
		  icon: 'success'
		}).then((result) => {
		  if (result.value) {
            window.location.reload();
		  }
		})

            
    }
    

    //영상 시청이 끝났을 때 핸들러
    const videoEnded = () => {

        //현재 재생 시점 시간
        const currentTime = 
        videoRef && videoRef.current ? videoRef.current.getCurrentTime() : 0;
        const newCurrentTime = currentTime.toFixed(0);  //밀리초 -> 초

        // //영상의 총 시간
        const duration =
        videoRef && videoRef.current ? videoRef.current.getDuration() : 0;

        console.log("현재 재생 시간(초) = ", newCurrentTime);
        console.log("영상의 총 시간(초) = ", duration);

        //해당 문자열을 넣기 위한 선언
        const success = "완료";

        const formData = new FormData();
        formData.append("courseTime", newCurrentTime);
        formData.append("courseStatus", success);
        formData.append("lectureWeek.lectureWeekCode", lectureWeekCode)

        // API 통신으로 보내기
        dispatch(callCourseHistoryAPI({
            form : formData
        }));

        console.log("formData = ", form);

        setLecModal(false)
        //알럿 및 새로고침
        Swal.fire({
		  title: '강의 종료',
		  text: "강의 시청이 완료되었습니다.",
		  icon: 'success'
		}).then((result) => {
		  if (result.value) {
            window.location.reload();
		  }
		})
    }
    
    /* seekTo() : 재생 컨트롤러를 인식하는 메소드
       getCurrentTime() : 현재 시간을 초로 반환하는 메소드
       getDuration() :  총 시간을 반환하는 메소드
     */

    
    return( 
        <div style={{ position: "fixed", top:0, left: 0, bottom: 0, right: 0, background: "rgba(0, 0, 0, 0.8)" }}>
            <div style={ { paddingTop:50, zindex:100, position:"absolute", marginLeft:400, backgroundColor:"white", justifyContent: "center", borderRadius: 10, top: "calc(18vh - 50px)" } }>
                <ReactPlayer 
                    url={ savedRoute } 
                    id="video"
                    width='1200px' 
                    height='600px' 
                    ref={ videoRef }
                    controls={true}
                    onEnded={() => videoEnded()}   //끝났을때 자동 종료
                />
                <button
                        style={ { marginLeft: 5 } }
                        onClick={ closeModalHandler  }
                    >
                        X
                </button>
            </div>
        </div>
    )
}

export default LecModal;