import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import { Field, FieldArray, reduxForm } from 'redux-form'
import { FormControl } from './common/FormControl';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveOrUpdateUser } from '../actions/UserAction';

// Functional component for User skills
const renderSkill = ({ fields, meta: { error, submitFailed } }) => (
    <div>
        <RaisedButton label="Add Skill" onClick={() => fields.push({})} />
        {fields.length > 0 ?
            <Table selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                    <TableRow>
                        <TableHeaderColumn>Serial no</TableHeaderColumn>
                        <TableHeaderColumn>Skill name</TableHeaderColumn>
                        <TableHeaderColumn>Experience</TableHeaderColumn>
                        <TableHeaderColumn>Sample code URL</TableHeaderColumn>
                        <TableHeaderColumn>Git Repository URL</TableHeaderColumn>
                        <TableHeaderColumn>Action</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {fields.map((skill, index) => (
                        <TableRow key={index} displayBorder={false}>
                            <TableRowColumn>{index + 1}</TableRowColumn>
                            <TableRowColumn> <Field
                                name={`${skill}.skillName`}
                                component={FormControl}
                                label="Skill name"
                            /></TableRowColumn>
                            <TableRowColumn>
                                <Field
                                    name={`${skill}.experience`}
                                    type="number"
                                    component={FormControl}
                                    label="# of year"
                                />
                            </TableRowColumn>
                            <TableRowColumn>
                                <Field
                                    name={`${skill}.sampleCodeUrl`}
                                    type="text"
                                    component={FormControl}
                                    label="Sample code URL"
                                />
                            </TableRowColumn>
                            <TableRowColumn>
                                <Field
                                    name={`${skill}.gitRepositoryUrl`}
                                    type="text"
                                    component={FormControl}
                                    label="Git repository Url"
                                />
                            </TableRowColumn>
                            <TableRowColumn>
                                <IconButton touch={true} onClick={() => fields.remove(index)}>
                                    <FontIcon className="fa fa-remove" color={true ? '#e02222' : '#00bcd4'} />
                                </IconButton></TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table> : null}
    </div>
)

// Add User class based component
class AddUser extends React.Component {

    // Submit form callback
    submitForm(data) {
        this.props.saveOrUpdateUser(data, (response) => {
            alert(response.message);
            this.props.reset();
        });
    }

    // Life cycle hook of react application
    componentWillMount() {
        if (localStorage.getItem("username") === null) {
            this.props.history.replace('/');
            return;
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.submitForm.bind(this))}>
                    <Table selectable={false}>
                        <TableBody displayRowCheckbox={false}>
                            <TableRow displayBorder={false}>
                                <TableRowColumn><Field name="firstName" label="First Name" component={FormControl} /></TableRowColumn>
                                <TableRowColumn><Field name="lastName" label="Last Name" component={FormControl} /></TableRowColumn>
                            </TableRow>
                            <TableRow displayBorder={false}>
                                <TableRowColumn><Field name="city" label="City" component={FormControl} /></TableRowColumn>
                                <TableRowColumn><Field name="state" label="State" component={FormControl} /></TableRowColumn>
                            </TableRow>
                            <TableRow displayBorder={false}>
                                <TableRowColumn><Field name="country" label="Country" component={FormControl} /></TableRowColumn>
                                <TableRowColumn><Field name="company" label="Company" component={FormControl} /></TableRowColumn>
                            </TableRow>
                            <TableRow displayBorder={false}>
                                <TableRowColumn><Field name="linkdinUrl" label="LinkedIn profile URL" component={FormControl} /></TableRowColumn>
                                <TableRowColumn><Field name="portfolioUrl" label="Portfolio URL" component={FormControl} /></TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <br />
                    <br />
                    <FieldArray name="userSkills" component={renderSkill} />
                    <br />
                    <div style={{textAlign: 'center'}}>
                        <RaisedButton type="submit" label="Save User" primary={true} />
                        <Link to={`/admin`} style={{ marginLeft: '50px' }}><RaisedButton label="User list" primary={true} /></Link>
                    </div>
                </form>
            </div>
        );
    }
}

// Form validation callback for redux form
const validate = values => {
    const errors = {};
    var urlRegex = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (!values.firstName) {
        errors.firstName = "Please enter first name";
    }
    if (!values.lastName) {
        errors.lastName = "Please enter last name";
    }
    if (values.city && values.city.length > 20) {
        errors.city = 'City name not be more than 20 character';
    }
    if (values.state && values.state.length > 20) {
        errors.state = 'State name not be more than 20 character';
    }
    if (values.country && values.country.length > 50) {
        errors.country = 'Country name not be more than 50 character';
    }
    if (values.company && values.company.length > 150) {
        errors.company = 'Company name not be more than 150 character';
    }
    if (values.linkdinUrl && (!urlRegex.test(values.linkdinUrl) || values.linkdinUrl.length > 100)) {
        errors.linkdinUrl = 'Please provide a valid Linkdin URL not be more than 100 character';
    }
    if (values.portfolioUrl && (!urlRegex.test(values.portfolioUrl) || values.portfolioUrl.length > 100)) {
        errors.portfolioUrl = 'Please provide a valid Portfolio URL not be more than 100 character';
    }
    if (values.skillName && values.skillName.length > 30) {
        errors.skillName = 'Skill name not be more than 30 character';
    }
    if (values.sampleCodeUrl && values.sampleCodeUrl.length > 100) {
        errors.sampleCodeUrl = 'Sample code URL not be more than 100 character';
    }
    if (values.gitRepositoryUrl && values.gitRepositoryUrl.length > 100) {
        errors.gitRepositoryUrl = 'Git repository URL not be more than 100 character';
    }
    return errors;
}

AddUser = reduxForm({
    form: 'add_user_form',
    enableReinitialize: true,
    validate
})(AddUser);

export default connect(state => ({ initialValues: state.editUser }), { saveOrUpdateUser })(AddUser);