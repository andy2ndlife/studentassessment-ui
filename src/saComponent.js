import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import $ from 'jquery';

export default class saComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedStudent:"",
      clickCounter: [0],
      showForm:false,
      showGrades:false,
      modal: false,
      assessmentArray:[{"inputVal":"","inputUnit":"","targetUnit":"","response":""}],
      gradeDetails: {"studentname":"","assessment":[]}
    };
    //this.updateRecords = this.updateRecords.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.assessStudent = this.assessStudent.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    // this.toggle = this.toggle.bind(this);
    }

    handleChange(event){
      if(event.target.value!=""){
        this.setState({showForm:true});    
        if(event.target.value=="15"){
          this.setState({selectedStudent:"John"});  
        }
        if(event.target.value=="16"){
          this.setState({selectedStudent:"Bryan"});  
        }
        if(event.target.value=="17"){
          this.setState({selectedStudent:"William"});  
        }
        this.setState({showGrades:false});
      }else{
        this.setState({showForm:false});  
        this.setState({showGrades:false});  
      }          
    }  

  assessStudent(e){
    e.preventDefault();
    var self = this;
    console.log(this.state.assessmentArray);
    const reqJson = {
      "studentname":this.state.selectedStudent,
      "assessment":this.state.assessmentArray
    };
    
    console.log("Request JSON:",reqJson);

    $.ajax({
      url:'http://localhost:3001/assess',
      type:'POST',//change to POST
      //contentType: 'application/json',
      //data: reqJson
      data : JSON.stringify(reqJson),
      contentType: "application/json; charset=utf-8"
    }).then(function(response){
      console.log("AJAX Response:",response);
      
      var cnt = 0;
      response.assessment.forEach(function(val,index) { 
        console.log(val); 
        if(val.flag=="Correct"){
          cnt++;
        }
      });
      //console.log(cnt,"/",response.assessment.length) ;
      response.totalQuestions =  response.assessment.length;
      response.correctAnswers =  cnt;
      self.setState({gradeDetails:response});
    });
    this.setState({showForm:false});
    this.setState({showGrades:true});
    $("#studentSelect").val("");
   
}

addQuestion(event,row){
  const items = this.state.clickCounter;
  items.push(row++);
    // re-render the whole component
    //this.forceUpdate();
    this.setState({clickCounter:items});    
    const assessmentItems = this.state.assessmentArray;
    assessmentItems.push({"inputVal":"","inputUnit":"","targetUnit":"","response":""});
 // items[row].inputVal = (items[row].inputVal==null||items[row].inputVal=="")?"":items[row].inputVal;
    this.setState({assessmentArray:assessmentItems});   
} 

inputTempChanged(event,row){
  console.log(row,event.target.value);
  const items = this.state.assessmentArray;
  items[row].inputVal = event.target.value;
  //items[row].inputUnit = (items[row].inputUnit==null||items[row].inputUnit=="")?"":items[row].inputUnit;
  this.setState({assessmentArray:items});
  //this.setState({assessmentArray:{"inputVal":event.target.value}});
  console.log(this.state.assessmentArray)
}

inputUnitChanged(event,row){
  console.log(row,event.target.value);
  const items = this.state.assessmentArray;
  items[row].inputUnit = event.target.value;
  //items[row].inputVal = (items[row].inputVal==null||items[row].inputVal=="")?"":items[row].inputVal;
  this.setState({assessmentArray:items});
  console.log(this.state.assessmentArray);
}

targetUnitChanged(event,row){
  console.log(row,event.target.value);
  //this.setState({assessmentArray:{"targetUnit":event.target.value}});
  const items = this.state.assessmentArray;
  items[row].targetUnit = event.target.value;
 // items[row].inputVal = (items[row].inputVal==null||items[row].inputVal=="")?"":items[row].inputVal;
  this.setState({assessmentArray:items});
  console.log(this.state.assessmentArray)
}

studentResponseChanged(event,row){
  console.log(row,event.target.value);
  // this.setState({assessmentArray:{"response":event.target.value}});
  const items = this.state.assessmentArray;
  items[row].response = event.target.value;
 // items[row].inputVal = (items[row].inputVal==null||items[row].inputVal=="")?"":items[row].inputVal;
  this.setState({assessmentArray:items});
  console.log(this.state.assessmentArray)
}

  render() {
    return (
        <div className="container">
        <div className="row">
        <div className="col-lg-12 pull-left">
        <Form>
        <FormGroup row>
          <Label sm={2} for="studentSelect">Assign A Student</Label>
          <Col sm={3}>
          <Input type="select" name="studentSelect" id="studentSelect" onChange={(e) => this.handleChange(e) }>
            <option value="">Select A Student</option>
            <option value="15">John</option>
            <option value="16">Bryan</option>
            <option value="17">William</option>            
          </Input>
          </Col>
          {this.state.showForm===true?
          <Col sm={2}><Button type="submit" title="Click here to validate answers for the selected student" onClick={this.assessStudent}>ASSESS NOW!</Button></Col>
          :''}
        </FormGroup>
        {this.state.showForm===true?
        <div>
        {this.state.clickCounter.map((item,i) => 
        
        
        <FormGroup key={i} row>
          <Col sm={3}>
            <Input type="text" name="inputTemp" id="inputTemp" placeholder="Enter Input temperature" onChange={(e) => this.inputTempChanged(e,i) } />
          </Col>
          <Col sm={2}>
          <Input type="select" name="inputUnit" id="inputUnit" onChange={(e) => this.inputUnitChanged(e,i) }>
            <option>Select An Unit</option>
            <option value="K">Kelvin</option>
            <option value="C">Celsius</option>            
            <option value="F">Fahrenheit</option>            
            <option value="R">Rankine</option>            
          </Input>
          </Col>
          <Col sm={3}>
          <Input type="select" name="targetUnit" id="targetUnit" onChange={(e) => this.targetUnitChanged(e,i) }>
            <option>Select Target Unit</option>
            <option value="K">Kelvin</option>
            <option value="C">Celsius</option>            
            <option value="F">Fahrenheit</option>            
            <option value="R">Rankine</option>            
          </Input>
          </Col>
          <Col sm={3}>
            <Input type="text" name="studentResponse" id="studentResponse" onChange={(e) => this.studentResponseChanged(e,i) } placeholder="Enter Student's Response" />
          </Col>
          <Button title="Click here to add another question!" onClick={(e) => this.addQuestion(e,i) } sm={1}><i className="fa fa-plus" aria-hidden="true"></i></Button>
          
        </FormGroup>
        )}
       
        </div>
        :''}
        
        
      </Form>

        </div>
        </div>
        {this.state.showGrades===true?
        <div>
        <div className="row">
        <div className="col-lg-12">
         <h4>Grade Details For {this.state.selectedStudent} ({this.state.gradeDetails.correctAnswers}/{this.state.gradeDetails.totalQuestions})</h4> 
        </div>
        </div>
        <div className="row">
        <div className="col-lg-10 text-center">
        <table className="table table-hover table-sm" id="myTable">
        
        <tbody>          
        {this.state.gradeDetails.assessment.map((item,i) => 
        <tr key={i}>
        <td>
         {item.inputVal} 
         {item.inputUnit==='C'?" Celsius ":""}
         {item.inputUnit==='K'?" Kelvin ":""}
         {item.inputUnit==='F'?" Fahrenheit ":""}
         {item.inputUnit==='R'?" Rankine ":""}        
        to 
        {item.targetUnit==='C'?" Celsius ":""}
         {item.targetUnit==='K'?" Kelvin ":""}
         {item.targetUnit==='F'?" Fahrenheit ":""}
         {item.targetUnit==='R'?" Rankine ":""}
         is {item.response}. Correct Answer is {item.output}
        </td>
        <td>
          <span className={item.flag=="Correct"?"greenText":"redText"} id="result">{item.flag}</span>
        </td>
        </tr>
        )}

        </tbody>
        </table>  
          </div>
          </div>
        
        </div>
        :''}
        

        </div>
      
    );
  }
}
