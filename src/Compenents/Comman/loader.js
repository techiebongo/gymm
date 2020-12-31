import React from 'react';
import Loader from 'react-loader-spinner';
import Modal from "react-bootstrap/Modal";
import "../../Utils/style.css";
const loader = props => {
    
    return (
        <>
        <Modal
            show={props.modalToggle}
            // onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            style={{marginTop:250}}
            // aria-labelledby="example-custom-modal-styling-title"
          >
        <div
        style={{
          width: "100%",
          height: "20",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 16,
          color: "#000080",
          //  backgroundColor:  'transparent',
          // opacity: 1,
          
        }}
        className='loaderClass'
      >
        {props.text}
        <Loader type="ThreeDots" color="#000080" height="20" width="100" />
        
      </div>
      </Modal>
      </>
    );
}

export default loader;