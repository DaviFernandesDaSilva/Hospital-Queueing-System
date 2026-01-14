import React, { Component } from 'react';

class AllDoctors extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <table className="table table-striped table-hover table-bordered" style={{marginTop:'20px', marginBottom: '20px'}}>
        <thead>
          <tr>
            <th className="text-danger">First Name</th>
            <th className="text-danger">Last Name</th>
            <th className="text-danger">On Duty</th>
          </tr>
        </thead>
        <tbody>
          {this.props.doctors.length===0 && <tr><td colSpan="6">No doctors. Add a doctor to start.</td></tr> }
          {this.props.doctors.length>0 && this.props.doctors.map(doctor => (
            <tr key={this.props.doctor.doctorId}>
              <td>{this.props.doctor.firstName}</td>
              <td>{this.props.doctor.lastName}</td>
              <td width="100" align="center">
                <input type="checkbox" onChange={() => this.props.toggleDuty(this.props.doctor.doctorId)} checked={this.props.doctor.onDuty}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default AllDoctors;
