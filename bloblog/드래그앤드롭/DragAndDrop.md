## DragAndDrop

### ✅ INDEX

[드래그 앤 드롭 구현하기](#드래그-앤-드롭-구현하기)  
[드래그 앤 드롭 실습](#드래그-앤-드롭-실습)

## 드래그 앤 드롭 구현하기

### 라이브러리 없이 구현

```jsx
const DragAndDropCustom = () => {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [draggingStyle, setDraggingStyle] = useState({ top: 0, left: 0 });
  const dragItemRef = useRef(null);

  const handleMouseDown = (index, e) => {
    setDraggingIndex(index);
    dragItemRef.current = { offsetX: e.clientX, offsetY: e.clientY };
    setDraggingStyle({ top: e.clientY, left: e.clientX });
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (draggingIndex !== null) {
      setDraggingStyle({
        top: e.clientY - dragItemRef.current.offsetY,
        left: e.clientX - dragItemRef.current.offsetX,
      });
    }
  };

  const handleMouseUp = () => {
    setDraggingIndex(null);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <ul style={{ position: "relative", listStyle: "none", padding: 0 }}>
      {items.map((item, index) => (
        <li
          key={index}
          onMouseDown={(e) => handleMouseDown(index, e)}
          style={{
            padding: "10px",
            margin: "5px 0",
            backgroundColor: draggingIndex === index ? "#f0f0f0" : "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "grab",
            position: draggingIndex === index ? "absolute" : "static",
            zIndex: draggingIndex === index ? 1000 : 1,
            top: draggingIndex === index ? `${draggingStyle.top}px` : "auto",
            left: draggingIndex === index ? `${draggingStyle.left}px` : "auto",
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default DragAndDropCustom;
```

→ 위처럼 Mouse 이벤트를 기반으로 구현하면 복잡하고 유지보수 어려움  
→ 라이브러리 사용하여 간단하고 범용적(데스크탑, 모바일)으로 구현할 수 있음

### 대표적인 라이브러리

- `react-beautiful-dnd` 와 `react-dnd` 라이브러리
  - +) 전자의 경우 npm 에서 내려가서 더는 install 이 안됨!

### react-dnd 기본 개념

https://react-dnd.github.io/react-dnd/docs/overview

- useDrag
  - 드래그 가능한 요소를 정의하는 훅
  - `type` : 드래그 가능한 항목의 타입
  - `item` : 드래그할 항목에 대한 정보
- useDrop
  - 드롭 가능한 영역으로 정의하는 훅
  - 다른 항목 위에 드래그한 항목을 놓을 때 데이터를 변경하는 함수를 호출한다.
- 내부 데이터 및 상태 관리

  - 드래그 가능한 항목과 드롭 대상 간 상호작용을 통해 드래그한 항목이 드롭된 위치에 맞춰서 상태가 업데이트되도록 한다.
  - 이 때, 드래그 앤 드롭의 흐름을 추적하기 위해 `monitor` 객체 사용
    - 현재 드래그 상태, 드롭 가능한 영역 등을 추적하여 상태 업데이트에 반영할 수 있게 함

- DndProvider
  - react-dnd의 컨텍스트를 제공한다.
- HTML5 Backend
  - HTML5 Backend는 가장 기본적인 백엔드이며 HTML5 드래그 앤 드롭 API를 기반으로 함
  - 실제 서버를 의미하는 것이 아닌 드래그 앤 드롭 동작을 구현하는 기술적인 배경을 의미
  - 동작 감지, 이벤트 처리, 데이터나 상태 저장 및 전달 역할을 함
- Backend 종류

  - Touch Backend
    - 모바일 환경에서 사용할 수 있음
    - `react-dnd-touch-backend`를 사용하여 모바일 터치 이벤트 기반 드래그 앤 드롭 구현
  - Multi Backend

    - `react-dnd-multi-backend`를 사용하여 HTML5와 Touch Backend를 동시에 지원할 수 있음
    - 아래처럼 멀티 백엔드 사용 시 데스크톱 뿐만 아니라 모바일 터치로도 작동 가능
    - +) react 19 버전에서는 안되는 것으로 보임

    ```jsx
    import { TouchTransition } from "react-dnd-multi-backend";
    import { HTML5Backend } from "react-dnd-html5-backend";
    import { TouchBackend } from "react-dnd-touch-backend";

    // 환경에 따른 백엔드 설정
    const multiBackendOptions = {
      backends: [
        {
          backend: HTML5Backend, // 데스크톱
          preview: true,
        },
        {
          backend: TouchBackend, // 모바일
          options: { enableMouseEvents: true }, // 터치 기반
          preview: true,
          transition: TouchTransition,
        },
      ],
    };

    export default multiBackendOptions;
    ```

  - Custom Backend

## 드래그 앤 드롭 실습

### 리스트 순서 재배치

![순서재배치.gif](https://github.com/bloblog/fe-cs-study-2024/blob/bloblog-week16/bloblog/%EB%93%9C%EB%9E%98%EA%B7%B8%EC%95%A4%EB%93%9C%EB%A1%AD/image/%EC%88%9C%EC%84%9C%EC%9E%AC%EB%B0%B0%EC%B9%98.gif?raw=true)

- 리스트 컴포넌트

  ```jsx
  const ItemType = "ITEM";

  const DraggableItem = ({ item, index, moveItem }) => {
    const [, drag] = useDrag({
      type: ItemType,
      item: { index },
    });

    const [, drop] = useDrop({
      accept: ItemType,
      hover: (draggedItem) => {
        if (draggedItem.index !== index) {
          moveItem(draggedItem.index, index);
          draggedItem.index = index;
        }
      },
    });

    return <li ref={(node) => drag(drop(node))}>{item.content}</li>;
  };
  ```

- 리스트 페이지

  ```jsx
  import DraggableItem from "../../components/item";

  // 순서 변경 함수
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const Home = () => {
    const [items, setItems] = useState([
      { id: "1", content: "Item 1" },
      { id: "2", content: "Item 2" },
      { id: "3", content: "Item 3" },
      { id: "4", content: "Item 4" },
    ]);

    const moveItem = (fromIndex, toIndex) => {
      const reorderedItems = reorder(items, fromIndex, toIndex);
      setItems(reorderedItems);
    };

    return (
      <DndProvider backend={MultiBackend} options={multiBackendOptions}>
        <ul>
          {items.map((item, index) => (
            <DraggableItem
              key={item.id}
              item={item}
              index={index}
              moveItem={moveItem}
            />
          ))}
        </ul>
      </DndProvider>
    );
  };
  ```

### 자유 배치

![자유배치.gif](https://github.com/bloblog/fe-cs-study-2024/blob/bloblog-week16/bloblog/%EB%93%9C%EB%9E%98%EA%B7%B8%EC%95%A4%EB%93%9C%EB%A1%AD/image/%EC%9E%90%EC%9C%A0%EB%B0%B0%EC%B9%98.gif?raw=true)

- 메모지 컴포넌트

  ```jsx
  const ItemType = "MEMO";

  const DraggableMemo = ({ id, x, y, content, onMove }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemType,
      item: { id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <div
        ref={drag}
        id="memo"
        style={{ left: x, top: y, opacity: isDragging ? 0.5 : 1 }}
      >
        {content}
      </div>
    );
  };
  ```

- 보드 페이지

  ```jsx
  import DraggableMemo from "../../components/Memo";

  const ItemType = "MEMO";

  const Board = ({ memos, moveMemo }) => {
    const [, drop] = useDrop(() => ({
      accept: ItemType,
      drop: (item, monitor) => {
        const offset = monitor.getSourceClientOffset();
        if (!offset) return;
        moveMemo(item.id, offset.x, offset.y);
      },
    }));

    return (
      <div ref={drop} id="board">
        {memos.map((memo) => (
          <DraggableMemo
            key={memo.id}
            id={memo.id}
            x={memo.x}
            y={memo.y}
            content={memo.content}
            onMove={moveMemo}
          />
        ))}
      </div>
    );
  };

  const MainBoard = () => {
    const [memos, setMemos] = useState([
      { id: 1, x: 50, y: 50, content: "메모 1" },
      { id: 2, x: 200, y: 100, content: "메모 2" },
    ]);

    const moveMemo = (id, x, y) => {
      setMemos((prevMemos) =>
        prevMemos.map((memo) => (memo.id === id ? { ...memo, x, y } : memo))
      );
    };

    const addMemo = () => {
      const newMemo = {
        id: Date.now(),
        x: 100,
        y: 100,
        content: `메모 ${memos.length + 1}`,
      };
      setMemos((prevMemos) => [...prevMemos, newMemo]);
    };

    return (
      <DndProvider backend={MultiBackend} options={multiBackendOptions}>
        <button onClick={addMemo}>+ 메모 추가</button>
        <Board memos={memos} moveMemo={moveMemo} />
      </DndProvider>
    );
  };
  ```
