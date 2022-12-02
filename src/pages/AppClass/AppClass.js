import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callAppClassAPI } from '../../apis/AppClassApiCalls';
import { callAppClassListAPI } from '../../apis/LectureApiCalls';
import AppClassCSS from './AppClass.module.css';
import PageCSS from './Page.module.css';
import SubPlan from '../SubPlan/SubPlan';

function AppClass() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lecture = useSelector(state => state.lectureReducer);
    const lectureList = lecture.data;      

    // 모달창 노출 여부 state
    const [modalOpen, setModalOpen] = useState(false);

    // 모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };

    /* 페이징 버튼 */
    const [currentPage, setCurrentPage] = useState(1);
    const pageInfo = lecture.pageInfo;
    const pageNumber = [];
    if (pageInfo) {
        for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    /* 수강 목록 */
    useEffect(
        () => {
            dispatch(callAppClassListAPI({
                currentPage : currentPage
            }));
        }
        , [currentPage]
    )

    /* 신청 목록 클릭시 이동 */
    const onClickAppClassListHandler = () => {
        navigate("/layout/AppClassMyList", { replace : false });
    }

    /* 수강신청 버튼 이벤트 */
    const onClickAppClassHandler = (lectureCode) => {
        dispatch(callAppClassAPI(lectureCode));

        alert("수강 신청 되었습니다.");

    }

    const [value, setValue] = useState(false);
    function onClickHide() {
      setValue(value => !value);
    }


    return (
        <>
      
                <div>
                <table>
                    <colgroup>
                        <col width="15%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="5%" />
                    </colgroup>
                    <thead>
                        <tr>
                        <th>구분</th>
                         <th>강좌번호</th>
                         <th>학과명</th>
                          <th>강좌명</th>
                          <th>교수명</th>
                          <th>수강신청</th>
                          <th>수강인원</th>
                         <th>강의계획서</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            Array.isArray(lectureList) && lectureList.map(
                                (lecture) => (
                                    <tr
                                    key={ lecture.lectureCode }
                                    >
                                        <td>{ lecture.subject.majorType }</td>
                                        <td>{ lecture.lectureCode }</td>
                                        <td>{ lecture.subject.department.departmentName }</td>
                                        <td>{ lecture.lectureName }</td>
                                        <td>{ lecture.professor.professorName }</td>
                                        <td><button onClick={ () => onClickAppClassHandler(lecture)}
                                        >
                                                신청
                                        </button></td>
                                        <td>{ lecture.lecturePersonnel } / { lecture.capacity }</td>
                                        <td><button onClick={showModal}> 조회</button>
                                         {modalOpen && <SubPlan setModalOpen={setModalOpen} />}
                                        </td>
                                        
                                    </tr>
                                )
                            )
                          
                        }

                    </tbody>    
                    </table>
                    <div className= { AppClassCSS.sinBtn } >
                    <button className= { AppClassCSS.sinBtn2 } onClick= {onClickAppClassListHandler}> 신청목록 </button>
                  </div> 
                  </div>




                  <div style={ { listStyleType: 'none', display: 'flex', justifyContent: "center"} }>
            {
                Array.isArray(lectureList) &&
                <button
                    onClick={ () => setCurrentPage(currentPage - 1) }
                    disabled={ currentPage === 1 }
                    className={ PageCSS.pagingBtn }
                >
                    &lt;
                </button>
            }    
            {
                pageNumber.map((num) => (
                    <li key={num} onClick={ () => setCurrentPage(num) }>
                        <button
                            style={ currentPage === num ? { backgroundColor : 'orange'} : null }
                            className={ PageCSS.pagingBtn }
                        >
                            {num}
                        </button>
                    </li>
                ))
            }
          { 
                Array.isArray(lectureList) &&
                <button
                    onClick={ () => setCurrentPage(currentPage + 1) }
                    /*disabled={currentPage === pageInfo.maxPage || pageInfo.endPage === 1}*/
                    className={ PageCSS.pagingBtn }
                >
                    &gt;
                </button>
            } 
            </div>
                   
           </>
    );
}

export default AppClass;