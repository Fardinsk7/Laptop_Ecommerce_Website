import styled from "styled-components";
import { useAdmninContext } from "./context/AdminContext";

const Contact = () => {
  const{user,setUser} = useAdmninContext();
 
  const handleData=(e)=>{
    let value = e.target.value
    setUser({
      [e.target.name]:value
    })
  }
  



  return (
      <Wrapper>
        <h2 className="common-heading">Contact us</h2>
        <iframe title="Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.237029750656!2d72.8319892750792!3d19.184846882042265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6ee06ebad2b%3A0x9c288235c433657d!2sInfiniti%20Mall!5e0!3m2!1sen!2sin!4v1687946143893!5m2!1sen!2sin" width="90%" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

        <div className="container">
          <div className="contact-form">
            <form action="https://formspree.io/f/mvojpqeo" method="POST" className="contact-inputs">
              <input type="text" placeholder="Enter Username" name="username" value={user.username} required style={{textTransform:"none",padding:"10px",border:"1px solid grey",outline:"none"}} onChange={(e)=>{handleData(e)}}/>

              <input type="email" placeholder="Enter Email" value={user.email} name="Email" required onChange={(e)=>{handleData(e)}} />

              <textarea name="Message" style={{textTransform:"none"}} placeholder="Enter Message" cols="30" rows="10" required></textarea>
              <input type="submit" value="send" />
            </form>
          </div>
        </div>
      </Wrapper>
  );
};

const Wrapper = styled.section`
padding: 9rem 0 5rem 0;
text-align: center;

.container {
  margin-top: 6rem;

  .contact-form {
    max-width: 50rem;
    margin: auto;

    .contact-inputs {
      display: flex;
      flex-direction: column;
      align-item:center;
      justify-content: center;
      gap: 3rem;

      input[type="submit"] {
        border: none;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background-color: ${({ theme }) => theme.colors.white};
          border: 1px solid ${({ theme }) => theme.colors.btn};
          color: ${({ theme }) => theme.colors.btn};
          transform: scale(0.9);
        }
      }
    }
  }
}
`;

export default Contact;
