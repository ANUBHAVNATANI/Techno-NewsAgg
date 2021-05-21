// import React, { useState } from "react";
// import { useFormik } from "formik";
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
// import { Card } from "semantic-ui-react";

// export default function Test() {
//   const [arr, setArr] = useState([1, 5, 8, 9]);
//   const renderArr = arr.map((item) => <Card key={item} content={item} />);
//   const formik = useFormik({
//     initialValues: {
//       numb: ""
//     },
//     onSubmit: (values) => {
//       let tempArr = arr;
//       tempArr = [...arr, values.numb];
//       tempArr = tempArr.sort((a, b) => a - b);
//       let n = 0;
//       setTimeout(() => setArr(tempArr), 5000);
//     }
//   });

//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit}>
//         <input
//           id="numb"
//           name="numb"
//           type="number"
//           onChange={formik.handleChange}
//           value={formik.values.numb}
//         />
//         <button type="submit">Add number</button>
//       </form>
//       <ResponsiveMasonry
//         columnsCountBreakPoints={{ 225: 1, 450: 2, 675: 3, 900: 4 }}
//       >
//         <Masonry columnsCount={4}> {renderArr}</Masonry>
//       </ResponsiveMasonry>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import { Card, Header, Button, Dimmer, Image } from "semantic-ui-react";

// export default function Test() {
//   const [dimActive, setDimActive] = useState(false);
//   const imageUrl = "https://react.semantic-ui.com/images/wireframe/image.png";
//   const title = "Hola";
//   const meta = "Github";
//   const content = (
//     <div>
//       <Header as="h2" inverted>
//         Title
//       </Header>

//       <Button primary>Add</Button>
//       <Button>View</Button>
//     </div>
//   );
//   const handleShow = () => {
//     setDimActive(true);
//   };
//   const handleHide = () => {
//     setDimActive(false);
//   };
//   return (
//     <div>
//       <Dimmer.Dimmable
//         as={Image}
//         dimmed={dimActive}
//         onMouseEnter={handleShow}
//         onMouseLeave={handleHide}
//         src={imageUrl}
//         // header={title}
//         // meta={meta}
//         size="medium"
//         dimmer={{ dimActive, content }}
//       >
//         {/* <Dimmer active={dimactive}>
//           <div>
//             {checkSummaryContent(props.feedData.summary)
//               ? props.feedData.summary
//               : feedInfo.excerpt}
//           </div>
//         </Dimmer> */}
//       </Dimmer.Dimmable>
//     </div>
//   );
// }

// import React, { Component } from "react";
// import { Button, Dimmer, Header, Image, Card } from "semantic-ui-react";

// export default class Test extends Component {
//   state = {};

//   handleShow = () => this.setState({ active: true });
//   handleHide = () => this.setState({ active: false });

//   render() {
//     const { active } = this.state;
//     const content = (
//       <div>
//         <Header as="h2" inverted>
//           Title
//         </Header>

//         <Button primary>Add</Button>
//         <Button>View</Button>
//       </div>
//     );

//     return (
//       <Dimmer.Dimmable
//         as={Card}
//         dimmed={active}
//         dimmer={{ active, content }}
//         onMouseEnter={this.handleShow}
//         onMouseLeave={this.handleHide}
//         image="https://react.semantic-ui.com/images/wireframe/image.png"
//         header="Hola"
//       />
//     );
//   }
// }
