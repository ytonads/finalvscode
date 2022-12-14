import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callProfessorRegistAPI } from '../../apis/MemberApiCalls';
import ProfessorLoginCss from './ProfessorRegist.module.css';

function ProfessorRegist() {

    const professor = useSelector(state => state.professorReducer);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        loginId : '',
        loginPassword : '',
        professorRegistNum : '',
        professorCode : ''
    });

    // useEffect(() => {
    //     if(professor.status === 201) {
    //         alert("교수님의 회원 가입이 완료 되었습니다. 로그인 페이지로 이동합니다.");
    //         navigate("/login", { replace : true });
    //     }
    // },
    // [professor]);



    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickBackHandler = () => {
        navigate("/", { replace : true });
    }

    /* 교수 가입 API 호출 */
    const onClickRegisterHandler = () => {
        dispatch(callProfessorRegistAPI({
            form : form
        }));
    }

    return (
        <div className={ ProfessorLoginCss.backgroundDiv }>
            <div className={ ProfessorLoginCss.proRegist }>
                <h1>교수 회원가입</h1>
                <input className={ ProfessorLoginCss.idInput }
                    type="text" 
                    name="loginId"
                    placeholder="아이디" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input className={ ProfessorLoginCss.pwInput }
                    type="password"
                    name="loginPassword" 
                    placeholder="패스워드" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input className={ ProfessorLoginCss.pwInput }
                    type="text"
                    name="professorRegistNum" 
                    placeholder="professorRegistNum" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input className={ ProfessorLoginCss.pwInput }
                    type="text"
                    name="professorCode" 
                    placeholder="professorCode" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <button className={ ProfessorLoginCss.btn }
                    onClick = { onClickRegisterHandler }
                >   
                    회원가입
                </button>
                <button className={ ProfessorLoginCss.btn }
                    onClick = { onClickBackHandler }
                >
                    돌아가기
                </button>
            </div>
        </div>
    );
}

export default ProfessorRegist;
