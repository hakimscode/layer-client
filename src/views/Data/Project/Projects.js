import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Row,
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Badge
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class Projects extends Component {
  constructor(props) {
    super(props);

    this.API_URL = "http://localhost:5000/projects";
    this.API_URL_KANDANG = "http://localhost:5000/kandangs";
    // this.API_URL = "https://api.fawwazlab.com/lapor/api/jenis_laporan";

    this.state = {
      projects: [],
      arrKandang: [],
      txt_kandang: "",
      txt_periode: "",
      txt_populasi_awal: "",
      txt_tanggal_mulai: "",
      txt_id: "",

      value_simpan: "Simpan"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
  }

  componentDidMount() {
    axios.get(this.API_URL + '/all').then(res => {
      this.setState({ projects: res.data.data });
    });
    axios.get(this.API_URL_KANDANG).then(res => {
      this.setState({arrKandang: res.data.data})
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  cancelClick = () => {
    this.setState({
      txt_id: "",
      txt_kandang: "",
      txt_periode: "",
      txt_populasi_awal: "",
      txt_tanggal_mulai: "",
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
        .post(this.API_URL, {
          kandang_id: this.state.txt_kandang,
          periode: this.state.txt_periode,
          populasi_awal: this.state.txt_populasi_awal,
          tanggal_mulai: this.state.txt_tanggal_mulai
        })
        .then(res => {
          if (res.status === 201) {
            this.setState({
              projects: [...this.state.projects, res.data.data]
            });
            this.cancelClick();
          } else {
            console.log("error");
          }
        });
  };

  statusProject = (status) => {
    if (status === 0){
      return <Badge color="secondary">Sedang Berjalan</Badge>
    }else{
      return <Badge color="success">Sudah Closing</Badge>
    }
  }

  linkDetailId = id => {
    return "/data/Project/" + id;
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
            <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Form Project
              </CardHeader>
              <Form onSubmit={this.handleSubmit}>
                <CardBody>
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="kategori-project">Kandang</Label>
                    </Col>
                    <Col xs="4" md="4">
                        <Input type="select" name="txt_kandang" id="kandang" onChange={this.handleChange} value={this.state.txt_kandang} required>
                            <option value="">pilih kandang</option>
                            {this.state.arrKandang.map((kandang, index) => 
                              <option key={index} value={kandang.id}>{kandang.name}</option>
                            )}
                        </Input>
                    </Col>
                    <Col md="2">
                      <Label htmlFor="nama-project">Periode</Label>
                    </Col>
                    <Col xs="4" md="4">
                      <Input
                        type="number"
                        name="txt_periode"
                        onChange={this.handleChange}
                        value={this.state.txt_periode}
                        required
                        placeholder="Periode"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="satuan-project">Populasi Awal</Label>
                    </Col>
                    <Col xs="4" md="4">
                      <Input
                        type="number"
                        name="txt_populasi_awal"
                        onChange={this.handleChange}
                        value={this.state.txt_populasi_awal}
                        required
                        placeholder="Populasi Awal"
                      />
                    </Col>
                    <Col md="2">
                      <Label htmlFor="satuan-project">Tanggal Mulai</Label>
                    </Col>
                    <Col xs="4" md="4">
                      <Input
                        type="text"
                        name="txt_tanggal_mulai"
                        onChange={this.handleChange}
                        value={this.state.txt_tanggal_mulai}
                        required
                        placeholder="Tanggal Mulai"
                      />
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i>{" "}
                    {this.state.value_simpan}
                  </Button>
                  <Button size="sm" color="danger" onClick={this.cancelClick}>
                    <i className="fa fa-ban"></i> Cancel
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Data Project
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Kandang</th>
                      <th>Periode</th>
                      <th>Populasi Awal</th>
                      <th>Tanggal Mulai</th>
                      <th>Status</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.projects.map((row, index) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td>{row.kandang.name}</td>
                        <td>{row.periode}</td>
                        <td>{row.populasi_awal}</td>
                        <td>{row.tanggal_mulai}</td>
                        <td>{this.statusProject(row.status)}</td>
                        <td>
                          <Link to={this.linkDetailId(row.id)}>Detail</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Projects;
