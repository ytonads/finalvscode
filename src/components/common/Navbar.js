import { decodeJwt } from '../../utils/tokenUtils';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import NavbarCSS from './Navbar.module.css';
import { callLogoutAPI, callGetMyInfoAPI } from '../../apis/MemberApiCalls';
import { useDispatch } from "react-redux";
import { useEffect } from 'react';


function Navbar() {

    const member = useSelector(state => state.memberReducer);
    const memberDetail = member.data;
    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;


    const dispatch = useDispatch();
    const navigate = useNavigate();


    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0];
    }

   
    /* 로그아웃 토큰 폐기 처리 */
    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');
        dispatch(callLogoutAPI());
        window.location = "http://localhost:3000/";
    }


    /* 내 정보 불러오기 */
    useEffect(() => {
        if(isLogin){
            dispatch(callGetMyInfoAPI({
                loginId: isLogin.loginId
            }));
        }
    },[]);



    function AfterLogin() {

        return(

            <div>

                <text
                    onClick = { onClickLogoutHandler }
                >
                    로그아웃
                </text>

            </div>

        );

    }

    return (
        <>
        <div>
            <ul className={ NavbarCSS.NavlistUl }>
                <div>
                    <ul>
                        { memberDetail && 
                        <div>
                            
                            <div>
                                <img src="/images/admin.ico" alt=""></img>
                            </div>
                            <div>
                            <strong>{ memberDetail?.professor?.professorName || memberDetail?.student?.studentName || '관리자' }님</strong><br/>
                            <strong>{ memberDetail?.professor?.professorCode || memberDetail?.student?.studentNo || '' }</strong>
                            <p>{ memberDetail?.professor?.professor?.department?.departmentName || memberDetail?.student?.department?.departmentName || '' }</p>
                            <a href="/">마이페이지</a><AfterLogin> 로그아웃</AfterLogin>
                            </div>
                            
                        </div>
                        } 
                   </ul>
                </div>
                {/* 학생 */}
                { decoded === "ROLE_STUDENT" &&<li><NavLink to="/layout/lectureStuList">강의실</NavLink></li> }
                { decoded === "ROLE_STUDENT" &&<li><NavLink to="/layout/AppClass">수강신청</NavLink></li> }
                { decoded === "ROLE_STUDENT" &&<li><NavLink to="/">학과일정</NavLink></li> }
                { decoded === "ROLE_STUDENT" &&<li><NavLink to="/">공지사항</NavLink></li> }
                 {/* 관리자 */}
                 { decoded === "ROLE_ADMIN" &&<li><NavLink to="/management/student">인사관리</NavLink></li> }
                { decoded === "ROLE_ADMIN" &&<li><NavLink to="/">강의실</NavLink></li> }
                { decoded === "ROLE_ADMIN" &&<li><NavLink to="/">과목관리</NavLink></li> }
                { decoded === "ROLE_ADMIN" &&<li><NavLink to="/">학과일정</NavLink></li> }
                { decoded === "ROLE_ADMIN" &&<li><NavLink to="/board/schoolnotice">공지사항</NavLink></li> }
                {/* 교수 */}
                { decoded === "ROLE_PROFESSOR" &&<li><NavLink to="/layout/lectureProList">강의실</NavLink></li> }
                { decoded === "ROLE_PROFESSOR" &&<li><NavLink to="/">수강신청</NavLink></li> }
                { decoded === "ROLE_PROFESSOR" &&<li><NavLink to="/">학과일정</NavLink></li> }
                { decoded === "ROLE_PROFESSOR" &&<li><NavLink to="/layout/subnotice">공지사항</NavLink></li> }
            </ul>
        </div>
        </>
    )


}

export default Navbar;