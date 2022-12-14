import { callLectureStuDetailAPI } from '../../apis/LectureApiCalls';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import lectureListStuCSS from './LectureStu_module.css';
import LecModal from './Modal/LecModal';



function LectureStuDetail(){


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lecture = useSelector(state => state.lectureReducer);
    const lectureDetail = lecture.data;
    const params = useParams();
    const lectureCode = params.lectureCode;
    const [lecModal, setLecModal] = useState(false);    //모달 띄우기 true/false
    const [savedRoute, setSavedRoute] = useState("");
    const [lectureWeekCode, setLectureWeekCode] = useState(0);


 
    console.log(lectureDetail)


    useEffect(
        () => {
            console.log('[LectureStuDetail 해당 강의실 번호 : ', lectureCode);
            
            dispatch(callLectureStuDetailAPI({
               lectureCode: lectureCode
            }));
            
        },
        []
    );

    console.log("lectureCode = ",lectureCode)




    //모달창 띄우기
    const videoOpenFunction = (lectureWeek) => {

        if(!lectureWeek.savedRoute){
            alert("해당 강의가 존재하지 않습니다.");
        } else {
            setSavedRoute(lectureWeek.savedRoute);
            setLectureWeekCode(lectureWeek.lectureWeekCode);
            setLecModal(true);
        }
        
        console.log("videoOpenFunction", setSavedRoute);
        console.log("videoOpenFunction", setLectureWeekCode);
    }


    //과제 등록 화면 넘기기
    const onClickLectureRegistHandler = () => {
        navigate("/layout/taskRegistStu", { replace : false });
    }

    //강좌 공지사항 화면 넘기기
    const onClickSubNoticeHandler = () => {
        navigate("/layout/Subnotice", { replace : false });
    }


    //쪽지 수신함 화면 넘기기
    // const onClickMsgHandler = () => {
    //     navigate("/layout/msgReceiveList", { replace : false });
    // }


    return (
        <>

            <div style={ { zindex:99 } }>
            
                <div>
                    <div style={{ marginLeft:450, paddingTop:19 }}><br/>
                        <h2
                            style={{  float:'left', cursor:"pointer", fontSize:25 }}
                            onClick={ onClickSubNoticeHandler }
                        >
                            공지 게시판 
                        </h2>
                        {/* <h2
                            style={{  float:'right', paddingRight:100, cursor:"pointer"  }}
                            onClick={ onClickMsgHandler }
                        >
                            💌
                        </h2> */}
                    </div><br/>
                    <div>
                        <h3
                            style={{ marginLeft:350, paddingTop:30 }}
                        >{ lectureDetail?.lectureName }  /  { lectureDetail?.professor?.professorName } 교수</h3>
                    </div>
                </div>

                <div>
                    { 
                        lecModal ? 
                        <LecModal 
                            lectureWeekCode={lectureWeekCode}
                            savedRoute={savedRoute}
                            setLecModal={setLecModal}
                        /> 
                        : null
                    }       
                    <table style={{ width:1500 }}>
                        <colgroup>
                            <col width="5%" />
                            <col width="10%" />
                            <col width="15%" />
                            <col width="20%" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>회차</th>
                                <th>기간</th>
                                <th>강의 영상</th>
                                <th>출석</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.isArray(lectureDetail?.lectureWeeks) && lectureDetail?.lectureWeeks.map(
                                    (lectureWeek) => ([<>
                                        <tr
                                            key={ lectureWeek.lectureWeekCodes }
                                        >
                                            <td>{ lectureWeek.week || '' }</td>
                                            <td>{ lectureWeek.startDate || '' } ~ { lectureWeek.endDate || '' }</td>
                                            <td>
                                                <button 
                                                    onClick={ () => videoOpenFunction(lectureWeek) }

                                                >
                                                    영상 보기
                                                </button>
                                            </td>
                                            <td>{ lectureWeek.courseStatus || '' }</td>
                                        </tr>

                                    </>])
                                )
                            }
                        </tbody>        
                    </table>    
                </div>

                <div>
                    <button
                        style={ { float:"right", marginRight:50, marginTop: 10 } }
                        onClick={ onClickLectureRegistHandler }
                    >
                        과제 제출
                    </button>
                    </div>
                <div/>



            </div>
        </>
           
    );
}


export default LectureStuDetail;