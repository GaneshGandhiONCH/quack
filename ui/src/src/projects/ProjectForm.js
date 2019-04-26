import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { withRouter } from 'react-router';
import * as Utils from '../common/Utils';


class ProjectForm extends Component {


    constructor(props) {
        super(props);
        this.state = {
             project: {
                 id: null,
                 name: "",
                 description: "",
                 allowedGroups: []
             }
         };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        var projectUpd = this.state.project;
        projectUpd[event.target.name] = event.target.value;
        const newState = Object.assign({}, this.state, {
          project: projectUpd
        });
        this.setState(newState);
      }

      handleSubmit(event) {
        axios.post('/api/project', this.state.project)
        .then(response => {
            this.props.history.push('/projects/' + response.id);
        }).catch(error => {Utils.onErrorMessage("Couldn't save project: " + error.message)});
        event.preventDefault();
      }

    componentDidMount() {
        if (this.props.id){
            axios
              .get("/api/project/" + this.props.id)
              .then(response => {
                const newState = Object.assign({}, this.state, {
                  project: response.data
                });
                this.setState(newState);
              }).catch(error => {Utils.onErrorMessage("Couldn't get project: " + error.message)});
        }
     }


    render() {
        return (
            <div>
                <h1>Create Project</h1>
                <form>
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">Name</label>
                      <div className="col-sm-10">
                        <input type="text" name="name" value={this.state.project.name} onChange={this.handleChange} />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">Description</label>
                      <div className="col-sm-10">
                        <input type="text" name="description" value={this.state.project.description} onChange={this.handleChange} />
                      </div>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Create</button>
                </form>
            </div>
        );
      }

}

export default withRouter(ProjectForm);
