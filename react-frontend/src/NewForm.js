import React from 'react';
import axios from 'axios';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
// import Modal from 'react-modal';
import {
    Link
} from 'react-router-dom';
import { Button, Form, FormGroup, FormControl, Col, ControlLabel, Modal } from 'react-bootstrap';
import './form.css';
import NumberFormat from 'react-number-format';

class NewForm extends React.Component {
    constructor(){
        super();
        // this.handleEntry = this.handleEntry()
        this.state={
            form:{
                name: '',
                website: '',
                summary: '',
                need1: '',
                need2: '',
                need3: '',
                youtubeLink: '',
                productAndServices: '',
                phone: '',
                email: '',
                companyImageForAdmin: '',
                industry: '',
                stage: '',
                location: 'Atlanta, GA',
                picture: null,
                linkedIn: '',
                profile: ''
            },
        }
    }

    componentDidMount() {
        this.setState({
            baseFormState: this.state.form,
            showModal: false
        });
    }

    handlename= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                name: event.target.value
            }
        });
    }

    handlewebsite= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                website: event.target.value
            }
        });
    }

    handlelinkedIn= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                linkedIn: event.target.value
            }
        })
    }

    handleprofile= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                profile: event.target.value
            }
        })
    }

    handlesummary= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                summary: event.target.value
            }
        });
    }

    handleneed1= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                need1: event.target.value
            }
        });
    }

    handleneed2= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                need2: event.target.value
            }
        });
    }

    handleneed3= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                need3: event.target.value
            }
        });
    }

    handleyoutubeLink= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                youtubeLink: event.target.value
            }
        });
    }
    
    handleproductAndServices =(event) => {
        this.setState({
            form: {
                ...this.state.form, 
                productAndServices: event.target.value
            }
        });
    }

    handlephone =(event) => {
        this.setState({
            form: {
                ...this.state.form, 
                phone: event.target.value
            }
        });
    }

    handleemail =(event) => {
        this.setState({
            form: {
                ...this.state.form, 
                email: event.target.value
            }
        });
    };

    handlePicture =(event) => {
        this.setState({
            form: {
                ...this.state.form, 
                picture: event.target.files[0]
            },
        })
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onloadend = (e) => {
                this.setState({
                    imagePreview: e.target.result
                });
            };
            reader.readAsDataURL(event.target.files[0]);
        };
    }

    handleindustry =(event) => {
        this.setState({
            form: {
                ...this.state.form, 
                industry: event.target.value
            }
        });
    }

    handlestage =(event) => {
        this.setState({
            form: {
                ...this.state.form, 
                stage: event.target.value
            }
        });
    }

    handlelocation =(event) => {
        this.setState({
            form: {
                ...this.state.form, 
                location: event.target.value
            }
        });
    }

    _clearForm = (event) => {
        event.preventDefault();
        this.setState({
            form: {
                name: '',
                website: '',
                summary: '',
                need1: 'Investing',
                need2: '',
                need3: '',
                youtubeLink: '',
                productAndServices: '',
                phone: '',
                email: '',
                industry: '',
                stage: '',
                picture: null,
                location: '',
                linkedIn: '',
                profile: ''
            }
        });
    }
    
    handleEntry(event){
        event.preventDefault();
        this.handleOpenModal();

        let needs = [];
        if (this.state.form.need1 !== '') {
            needs.push(this.state.form.need1);
        };
        if (this.state.form.need2 !== '') {
            needs.push(this.state.form.need2);
        };
        if (this.state.form.need3 !== '') {
            needs.push(this.state.form.need3);
        }; 
        
        let companyObject = {
            name: this.state.form.name,
            summary: this.state.form.summary,
            industry: this.state.form.industry,
            stage: this.state.form.stage,
            productAndServices: this.state.form.productAndServices,
            needs: needs,
            website: this.state.form.website,
            email: this.state.form.email,
            phone: this.state.form.phone,
            youtubeLink: this.state.form.youtubeLink,
            paypalLink: this.state.form.paypalLink,
            location: this.state.form.location,
            profile: this.state.form.profile,
            linkedIn: this.state.form.linkedIn,
        };
        
        axios.post('http://localhost:4000/api/createcompany', companyObject)
        .then(res => {
            return res.data._id;
        })
        .then((id) => {
            let fd;
            this.refs.cropper.getCroppedCanvas().toBlob((blob) => {
            fd = new FormData();
            fd.append('picture', blob);
            axios({
                method: 'post',
                url: `http://localhost:4000/api/createcompanypicture/${id}`,
                data: fd,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err));
            }); 
        })
        .catch(err => console.log(err));
    }; 

    _crop() {
        // const dataUrl = this.refs.cropper.getCroppedCanvas().toDataURL();
        this.setState({
            croppedImage: this.refs.cropper.getCroppedCanvas().toDataURL()
        });  
    };  

    handleOpenModal = () => {
        this.setState({ 
            showModal: true 
        });
    }
    
    handleCloseModal = () => {
        this.setState({ 
            showModal: false,
        });
    }

    render() {
        return (
            <div class="form-outer-container">
            <div className="form-container">
                <h2>Enter New Company</h2>
                <p>* Indicates required field</p>
                <Form horizontal onSubmit={(e) => {this.handleEntry(e)}}>
                    <FormGroup controlId="formHorizontalText">
                        <Col componentClass={ControlLabel} sm={2}>
                            Company Name*
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" placeholder="Company Name" value={this.state.form.name} onChange={this.handlename} required/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalTextArea">
                        <Col componentClass={ControlLabel} sm={2}>
                            Summary*
                        </Col>
                        <Col sm={10}>
                            <FormControl componentClass="textarea" 
                            placeholder="Company Summary" 
                            value={this.state.form.summary} 
                            onChange={this.handlesummary}
                            maxLength='100' required rows='3'/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalSelect">
                        <Col componentClass={ControlLabel} sm={2}>
                            Need 1*
                        </Col>
                        <Col sm={10}>
                            <FormControl componentClass="select" 
                            value={this.state.form.need1} 
                            onChange={this.handleneed1} required >
                            <option></option>
                            <option>Investing</option>
                            <option>Mentorship</option>
                            <option>Employees</option>
                            <option>Marketing</option>
                            <option>Public Relations</option>
                            <option>Facilities</option>
                            <option>System Monitoring</option>
                            <option>Legal Aide</option>
                            <option>IT Help</option>
                            </FormControl >
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalSelect">
                        <Col componentClass={ControlLabel} sm={2}>
                            Need 2
                        </Col>
                        <Col sm={10}>
                            <FormControl componentClass="select" 
                            value={this.state.form.need2} 
                            onChange={this.handleneed2} >
                            <option></option>
                            <option>Investing</option>
                            <option>Mentorship</option>
                            <option>Employees</option>
                            <option>Marketing</option>
                            <option>Public Relations</option>
                            <option>Facilities</option>
                            <option>System Monitoring</option>
                            <option>Legal Aide</option>
                            <option>IT Help</option>
                            </FormControl >
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalSelect">
                        <Col componentClass={ControlLabel} sm={2}>
                            Need 3
                        </Col>
                        <Col sm={10}>
                            <FormControl componentClass="select" 
                            value={this.state.form.need3} 
                            onChange={this.handleneed3} >
                            <option></option>
                            <option>Investing</option>
                            <option>Mentorship</option>
                            <option>Employees</option>
                            <option>Marketing</option>
                            <option>Public Relations</option>
                            <option>Facilities</option>
                            <option>System Monitoring</option>
                            <option>Legal Aide</option>
                            <option>IT Help</option>
                            </FormControl >
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalNumber">
                        <Col componentClass={ControlLabel} sm={2}>
                            Phone Number*
                        </Col>
                        <Col sm={10}>
                            {/* <FormControl type="number" placeholder="Phone Number" value={this.state.form.phone} onChange={this.handlephone} required
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" /> */}
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            Email*
                        </Col>
                        <Col sm={10}>
                            <FormControl type="email" placeholder="Company Email" value={this.state.form.email} onChange={this.handleemail} required/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalUrl">
                        <Col componentClass={ControlLabel} sm={2}>
                            Website
                        </Col>
                        <Col sm={10}>
                            <FormControl type="url" placeholder="https://www.mycompany.com" value={this.state.form.website} onChange={this.handlewebsite} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalUrl">
                        <Col componentClass={ControlLabel} sm={2}>
                            LinkedIn
                        </Col>
                        <Col sm={10}>
                            <FormControl type="url" placeholder="https://www.linkedin.com/in/yourprofile/" value={this.state.form.linkedIn} onChange={this.handlelinkedIn} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalUrl">
                        <Col componentClass={ControlLabel} sm={2}>
                            Pitch Video
                        </Col>
                        <Col sm={10}>
                            <FormControl type="url" placeholder="https://youtube.com/yourpathhere" value={this.state.form.youtubeLink} onChange={this.handleyoutubeLink} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalSelect">
                        <Col componentClass={ControlLabel} sm={2}>
                            Industry*
                        </Col>
                        <Col sm={10}>
                            <FormControl componentClass="select" 
                            value={this.state.form.industry} 
                            onChange={this.handleindustry} required>
                            <option></option>
                            <option>Apparel</option>
                            <option>Banking</option>
                            <option>Media</option>
                            <option>Construction</option>
                            <option>Civic</option>
                            <option>Real Estate</option>
                            <option>Gaming</option>
                            <option>Software</option>
                            <option>Hardware</option>
                            <option>Security</option>
                            <option>Education</option>
                            <option>Entertainment</option>
                            <option>Food/Beverage</option>
                            <option>Health/Fitness</option>
                            <option>IT</option>
                            <option>Insurance</option>
                            <option>Legal Services</option>
                            <option>Leisure</option>
                            <option>Management/Consulting</option>
                            <option>Military</option>
                            <option>Music</option>
                            <option>News</option>
                            <option>Alternative Energy</option>
                            <option>Public Relations</option>
                            <option>Manufacturing</option>
                            <option>Religion</option>
                            <option>Retail</option>
                            <option>Sporting Goods</option>
                            <option>Recruiting</option>
                            <option>Telecommunications</option>
                            <option>Transportation</option>
                            <option>Warehousing</option>
                            <option>Venture Capitalism</option>
                            </FormControl >
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalSelect">
                        <Col componentClass={ControlLabel} sm={2}>
                            Company Stage*
                        </Col>
                        <Col sm={10}>
                            <FormControl componentClass="select" 
                            value={this.state.form.stage} 
                            onChange={this.handlestage} required>
                            <option></option>
                            <option>StartUp</option>
                            <option>Growth</option>
                            <option>Establishment</option>
                            <option>Expansion</option>
                            <option>Maturity</option>       
                            </FormControl >
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalSelect">
                        <Col componentClass={ControlLabel} sm={2}>
                            Company Location*
                        </Col>
                        <Col sm={10}>
                            <FormControl componentClass="select" 
                            value={this.state.form.location} 
                            onChange={this.handlelocation} required>
                            <option>Atlanta, GA</option>
                            <option>Austin, TX</option>
                            <option>Bozeman, MT</option>
                            <option>Chicago, IL</option>
                            <option>Bay Area, CA</option>
                            <option>Columbis, OH</option>
                            <option>Detriot, MI</option>
                            <option>Houston, TX</option>
                            <option>Madison, WI</option>
                            <option>Minneapolis, MN</option>
                            <option>Nashville, TN</option>
                            <option>New York, NY</option>
                            <option>Philadelphia, PA</option>
                            <option>Raleigh, NC</option>
                            <option>San Antonio, TX</option>
                            <option>Seattle, WA</option>
                            <option>Washington D.C.</option>      
                            </FormControl >
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalFile">
                        <Col componentClass={ControlLabel} sm={2}>
                            Company Logo
                        </Col>
                        <Col sm={10}>
                            <FormControl type="file" onChange={this.handlePicture} accept='.png, .jpg, .jpeg' />
                        </Col>
                    </FormGroup>

                    <div className="form-button-container">
                            <Button className="form-button" bsStyle="primary" bsSize="large" type="submit">Create</Button>
                            <Button className="form-button" bsSize="large" onClick={this._clearForm}>Clear Form</Button>
                    </div>
                    
                </Form>
    </div>
    <NumberFormat format="(###) ###-####" mask="_" placeholder="Phone Number" value={this.state.form.phone} onChange={this.handlephone}/>
            
            <Cropper
                ref='cropper'
                src={this.state.imagePreview}
                style={{height: 400, width: '100%'}}
                // Cropper.js options
                aspectRatio={8/6}
                guides={false}
                autoCropArea={0}
                strict={false}
                highlight={false}
                dragCrop={true}
                cropBoxMovable={true}
                cropBoxResizable={false}
                crop={this._crop.bind(this)} />
                <br/>

                <div className="static-modal">
                    <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Succes!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>{this.state.form.name}'s profile was created!</h4>
                        </Modal.Body>
                        <Modal.Footer>
                            <Link to = "/admin" > 
                                <Button bsStyle="primary" onClick={this.handleCloseModal}>Continue</Button>
                            </Link>
                        </Modal.Footer>
                    </Modal>
                </div>
            
            </div>
        );
    }
}

export default NewForm;