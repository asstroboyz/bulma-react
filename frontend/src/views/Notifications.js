import React from "react";
import Swal from "sweetalert2";
import {
  Alert,
  UncontrolledAlert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

function Notifications() {
  const notify = (position) => {
    const colors = ["primary", "success", "danger", "warning", "info"];
    const type = colors[Math.floor(Math.random() * colors.length)];

    Swal.fire({
      position: position, // Posisi notifikasi
      icon: type, // Ikon berdasarkan tipe
      title: "Notification",
      html: "<b>Welcome to Black Dashboard React</b> - a beautiful freebie for every web developer.",
      showConfirmButton: false,
      timer: 3000, // Durasi dalam milidetik
      toast: true, // Menggunakan gaya toast
    });
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Notifications Style</CardTitle>
              </CardHeader>
              <CardBody>
                <Alert color="info">
                  <span>This is a plain notification</span>
                </Alert>
                <UncontrolledAlert color="info">
                  <span>This is a notification with close button.</span>
                </UncontrolledAlert>
                <UncontrolledAlert className="alert-with-icon" color="info">
                  <span className="tim-icons icon-bell-55" data-notify="icon" />
                  <span data-notify="message">
                    This is a notification with close button and icon.
                  </span>
                </UncontrolledAlert>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Notification States</CardTitle>
              </CardHeader>
              <CardBody>
                <UncontrolledAlert color="primary">
                  <span>
                    <b>Primary - </b>
                    This is a regular notification made with ".alert-primary"
                  </span>
                </UncontrolledAlert>
                <UncontrolledAlert color="info">
                  <span>
                    <b>Info - </b>
                    This is a regular notification made with ".alert-info"
                  </span>
                </UncontrolledAlert>
                <UncontrolledAlert color="success">
                  <span>
                    <b>Success - </b>
                    This is a regular notification made with ".alert-success"
                  </span>
                </UncontrolledAlert>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card>
              <CardBody>
                <div className="places-buttons">
                  <Row>
                    <Col className="ml-auto mr-auto text-center" md="6">
                      <CardTitle tag="h4">
                        Notifications Places
                        <p className="category">Click to view notifications</p>
                      </CardTitle>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="ml-auto mr-auto" lg="8">
                      <Row>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("top-start")}
                          >
                            Top Left
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("top")}
                          >
                            Top Center
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("top-end")}
                          >
                            Top Right
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="ml-auto mr-auto" lg="8">
                      <Row>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("bottom-start")}
                          >
                            Bottom Left
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("bottom")}
                          >
                            Bottom Center
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("bottom-end")}
                          >
                            Bottom Right
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Notifications;

// import React from "react";
// import NotificationAlert from "react-notification-alert";
// import {
//   Alert,
//   UncontrolledAlert,
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   CardTitle,
//   Row,
//   Col,
// } from "reactstrap";
// function Notifications() {
//   const notificationAlertRef = React.useRef(null);
//   const notify = (place) => {
//     var color = Math.floor(Math.random() * 5 + 1);
//     var type;
//     switch (color) {
//       case 1:
//         type = "primary";
//         break;
//       case 2:
//         type = "success";
//         break;
//       case 3:
//         type = "danger";
//         break;
//       case 4:
//         type = "warning";
//         break;
//       case 5:
//         type = "info";
//         break;
//       default:
//         break;
//     }
//     var options = {};
//     options = {
//       place: place,
//       message: (
//         <div>
//           <div>
//             Welcome to <b>Black Dashboard React</b> - a beautiful freebie for
//             every web developer.
//           </div>
//         </div>
//       ),
//       type: type,
//       icon: "tim-icons icon-bell-55",
//       autoDismiss: 7,
//     };
//     notificationAlertRef.current.notificationAlert(options);
//   };
//   return (
//     <>
//       <div className="content">
//         <div className="react-notification-alert-container">
//           <NotificationAlert ref={notificationAlertRef} />
//         </div>
//         <Row>
//           <Col md="6">
//             <Card>
//               <CardHeader>
//                 <CardTitle tag="h4">Notifications Style</CardTitle>
//               </CardHeader>
//               <CardBody>
//                 <Alert color="info">
//                   <span>This is a plain notification</span>
//                 </Alert>
//                 <UncontrolledAlert color="info">
//                   <span>This is a notification with close button.</span>
//                 </UncontrolledAlert>
//                 <UncontrolledAlert className="alert-with-icon" color="info">
//                   <span className="tim-icons icon-bell-55" data-notify="icon" />
//                   <span data-notify="message">
//                     This is a notification with close button and icon.
//                   </span>
//                 </UncontrolledAlert>
//                 <UncontrolledAlert className="alert-with-icon" color="info">
//                   <span className="tim-icons icon-bell-55" data-notify="icon" />
//                   <span data-notify="message">
//                     This is a notification with close button and icon and have
//                     many lines. You can see that the icon and the close button
//                     are always vertically aligned. This is a beautiful
//                     notification. So you don't have to worry about the style.
//                   </span>
//                 </UncontrolledAlert>
//               </CardBody>
//             </Card>
//           </Col>
//           <Col md="6">
//             <Card>
//               <CardHeader>
//                 <CardTitle tag="h4">Notification states</CardTitle>
//               </CardHeader>
//               <CardBody>
//                 <UncontrolledAlert color="primary">
//                   <span>
//                     <b>Primary - </b>
//                     This is a regular notification made with ".alert-primary"
//                   </span>
//                 </UncontrolledAlert>
//                 <UncontrolledAlert color="info">
//                   <span>
//                     <b>Info - </b>
//                     This is a regular notification made with ".alert-info"
//                   </span>
//                 </UncontrolledAlert>
//                 <UncontrolledAlert color="success">
//                   <span>
//                     <b>Success - </b>
//                     This is a regular notification made with ".alert-success"
//                   </span>
//                 </UncontrolledAlert>
//                 <UncontrolledAlert color="warning">
//                   <span>
//                     <b>Warning - </b>
//                     This is a regular notification made with ".alert-warning"
//                   </span>
//                 </UncontrolledAlert>
//                 <UncontrolledAlert color="danger">
//                   <span>
//                     <b>Danger - </b>
//                     This is a regular notification made with ".alert-danger"
//                   </span>
//                 </UncontrolledAlert>
//               </CardBody>
//             </Card>
//           </Col>
//           <Col md="12">
//             <Card>
//               <CardBody>
//                 <div className="places-buttons">
//                   <Row>
//                     <Col className="ml-auto mr-auto text-center" md="6">
//                       <CardTitle tag="h4">
//                         Notifications Places
//                         <p className="category">Click to view notifications</p>
//                       </CardTitle>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col className="ml-auto mr-auto" lg="8">
//                       <Row>
//                         <Col md="4">
//                           <Button
//                             block
//                             color="primary"
//                             onClick={() => notify("tl")}
//                           >
//                             Top Left
//                           </Button>
//                         </Col>
//                         <Col md="4">
//                           <Button
//                             block
//                             color="primary"
//                             onClick={() => notify("tc")}
//                           >
//                             Top Center
//                           </Button>
//                         </Col>
//                         <Col md="4">
//                           <Button
//                             block
//                             color="primary"
//                             onClick={() => notify("tr")}
//                           >
//                             Top Right
//                           </Button>
//                         </Col>
//                       </Row>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col className="ml-auto mr-auto" lg="8">
//                       <Row>
//                         <Col md="4">
//                           <Button
//                             block
//                             color="primary"
//                             onClick={() => notify("bl")}
//                           >
//                             Bottom Left
//                           </Button>
//                         </Col>
//                         <Col md="4">
//                           <Button
//                             block
//                             color="primary"
//                             onClick={() => notify("bc")}
//                           >
//                             Bottom Center
//                           </Button>
//                         </Col>
//                         <Col md="4">
//                           <Button
//                             block
//                             color="primary"
//                             onClick={() => notify("br")}
//                           >
//                             Bottom Right
//                           </Button>
//                         </Col>
//                       </Row>
//                     </Col>
//                   </Row>
//                 </div>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// }

// export default Notifications;
