## **1. 리액트 훅(Hook)이란**

- 함수 컴포넌트에서 상태(state)와 라이프사이클(lifecycle)을 쉽게 관리할 수 있도록 도와주는 기능
- 주요 리액트 훅
    - `useState`: 상태 관리
    - `useEffect`: 부수 효과(Side Effect) 처리 (예: API 호출, DOM 업데이트)
    - `useContext`: 전역 상태 관리 (Context API 활용)
    - `useReducer`: 복잡한 상태 로직 관리
    - `useRef`: DOM 참조 또는 값 유지
    - `useMemo`/`useCallback`: 성능 최적화

## 2. 커스텀 훅(Custom Hook)이란

- **리액트 훅을 조합**하여 상태와 로직을 하나의 함수로 추출한 사용자 정의 훅
- 사용하는 이유:
    - 컴포넌트 내부에서 중복되는 로직을 분리하여, **재사용성과 가독성을 높이기 위함**
- 이름 규칙:
    - 반드시 **`use`로 시작**해야 리액트가 이 함수가 Hook임을 인식한다
    - 예: `useFetch`, `useForm`
- Hook 규칙 준수:
    - 조건문이나 반복문 내부에서 호출하면 안 된다 (최상위에서만 호출)
    - 컴포넌트나 다른 Hook 내부에서 호출해야 한다
- 커스텀 훅의 반환값:
    - 훅의 목적에 따라 객체, 배열, 함수, 또는 단일 값 등 다양한 형태로 반환 가능

## 3.  커스텀 훅(Custom Hook)의 사용 예시

1. **API 호출 관리 (`useFetc`**
    
    ```jsx
    import { useState, useEffect } from "react";
    
    // 커스텀 훅 useFetch
    function useFetch(url) {
        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
    
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error("Failed to fetch");
                    const result = await response.json();
                    setData(result);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchData();
        }, [url]);
    
        return { data, loading, error };
    }
    
    // 사용 예시
    function FetchComponent() {
        const { data, loading, error } = useFetch("https://api.example.com/data");
    
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;
    
        return (
            <div>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        );
    }
    ```
    
    - 동일한 API 호출 로직이 필요한 다른 컴포넌트에서도 `useFetch`를 쉽게 재사용 가능
    - API 호출에 필요한 상태(`data`, `loading`, `error`)와 이를 업데이트하는 로직을 하나의 훅 안에 정리해 관리하기 쉬움
    - 변경 사항이 있을 경우 한 곳(`useFetch`)만 수정하면 됨
2. **폼 상태 관리 (`useForm`)**
    
    ```jsx
    import { useState } from "react";
    
    // 커스텀 훅 useForm
    function useForm(initialValues) {
        const [values, setValues] = useState(initialValues);
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setValues((prev) => ({ ...prev, [name]: value }));
        };
    
        const resetForm = () => setValues(initialValues);
    
        return [values, handleChange, resetForm];
    }
    
    // 사용 예시
    function FormComponent() {
        const [formValues, handleChange, resetForm] = useForm({
            username: "",
            email: "",
        });
    
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(formValues);
            resetForm();
        };
    
        return (
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    value={formValues.username}
                    onChange={handleChange}
                    placeholder="Username"
                />
                <input
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <button type="submit">Submit</button>
            </form>
        );
    }
    ```
    

## 4. 커스텀 훅(Custom Hook)의 장점

- **코드 재사용성**
    - **반복되는 로직을 캡슐화**하여 여러 컴포넌트에서 재사용 가능
    - 예: API 호출, 폼 상태 관리 등
- **가독성과 분리**
    - 복잡한 로직을 컴포넌트에서 분리하여 **컴포넌트는 UI와 비즈니스 로직을 명확히 구분**
    - 컴포넌트는 핵심 역할(렌더링)에 집중하고, 로직은 커스텀 훅으로 처리
- **유지보수 용이성**
    - 특정 기능의 로직이 변경되거나 기능을 확장할 경우, 커스텀 훅만 수정하면 훅을 사용하는 모든 컴포넌트에 적용됨
    - 코드가 한 곳에 모여 있어 수정이 쉽고 테스트도 간단
