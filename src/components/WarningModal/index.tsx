import Modal, { ModalProps } from 'react-bootstrap/Modal';



interface IWarningModal{
    subject: string, 
    content: string | Array<string>
    modalProps: ModalProps, 
  
  
  }
const WarningModal: React.FC<IWarningModal> = ({modalProps, subject, content}) => {
    return (
      <Modal
  
        {...modalProps}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Aviso
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{subject}</h4>
          {typeof content === "string" && <p> {content} </p> }
          {Array.isArray(content) && content.map((itemContent, index) => <p key={index}>{itemContent}</p>)}
  
        </Modal.Body>
  
      </Modal>
    );
  }
  

export default WarningModal