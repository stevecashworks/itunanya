import { useNavigate } from "react-router-dom";
import styles from "./modal.css"

const Modal=({messages,title})=>{
const navigate=useNavigate()
  return (
  <div className={`${styles.container} ${(messages.length===0)&&styles.hidden}`}>
    <p className={styles.title}>{title}</p>
    <hr />
    <div className={styles.messages}>
      {messages.map((message) => (
        <p>{message}</p>
      ))}
    </div>
    <hr></hr>
    <div className={styles.buttons}>
      <button onClick={()=>{navigate("/")}} className={styles.btnSecondary}>Cancel</button>
      <button onClick={()=>{window.location.reload()}} className={styles.btnPrimary}>Retry</button>
    </div>
  </div>
);
}
export default Modal