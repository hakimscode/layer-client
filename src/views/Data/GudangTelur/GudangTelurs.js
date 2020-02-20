import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button
} from "reactstrap";
import axios from "axios";

class GudangTelurs extends Component {
  constructor(props) {
    super(props);

    this.API_URL = "http://localhost:5000/gudang_telurs";
    // this.API_URL = "https://api.fawwazlab.com/lapor/api/jenis_laporan";

    this.state = {
      gudang_telurs: [
        {
          id: "",
          jumlah: "",
          tonase: "",
        }
      ],
    };
  }

  componentDidMount() {
    axios.get(this.API_URL).then(res => {
      this.setState({ gudang_telurs: res.data.data });
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Data Gudang Telur
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Jumlah Telur</th>
                      <th>Tonase Telur</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.gudang_telurs.map((gudang_telur, index) => (
                      <tr key={gudang_telur.id}>
                        <td>{index + 1}</td>
                        <td>{gudang_telur.jumlah}</td>
                        <td>{gudang_telur.tonase}</td>
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

export default GudangTelurs;
