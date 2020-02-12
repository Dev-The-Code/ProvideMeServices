import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Dimensions, Image, TouchableOpacity, TextInput } from 'react-native';
import TextInputs from '../textInputs/TextInputs';
// import Wheelspiner from '../Progress Wheel/Progress';
import styles from '../Styling/ProfilScreenStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn';
import AsyncStorage from '@react-native-community/async-storage';
import { thisExpression } from '@babel/types';
import HttpUtils from '../Services/HttpUtils';
import Modal from "react-native-modal";
import Textarea from 'react-native-textarea';
import { Rating, AirbnbRating } from 'react-native-ratings';
// const { height } = Dimensions.get('window');
let checkProfile = false;

class Profile extends React.Component {
  // static navigationOptions = (navigation) => {
  //   const { params = {} } = navigation.navigation.state;
  //   let headerRight;
  //   if (params.opponentProfile) {
  //     checkProfile = params.opponentProfile;
  //   }
  //   else {
  //     checkProfile = false;
  //     headerRight = <TouchableOpacity
  //       style={styles.headerIconContainer}
  //       onPress={
  //         params.showEditForm
  //       }
  //     >
  //       <Image source={require('../icons/edit-pencil.png')} style={styles.headerIcon} />
  //     </TouchableOpacity>
  //   }

  //   return {
  //     headerRight,
  //     headerStyle: {
  //       backgroundColor: 'white'
  //     },
  //     headerTintColor: 'gray',
  //   }
  // }
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      contactNo: '',
      email: '',
      gender: '',
      type: '',
      avatarSource: '',
      show: false,
      title: '',
      checkProfile: false,
      profileData: '',
      profile: '',
      forTrainnerModal: false,
      addCartColor: false,
    }
  }


  changeColor = (values) => {
    if (values === 'addCart') {
      this.setState({
        addCartColor: !this.state.addCartColor,
      })
    }
  }

  setModalVisible = (isVisible) => {
    this.setState({ forTrainnerModal: isVisible });
  }

  removeModal = () => {
    // const { navigate } = this.props.navigation;
    this.setState({
      forTrainnerModal: false
    },
      // () => { navigate('Homescreen') }
    )

  }

  // async  componentWillMount() {
  //   console.log(checkProfile, 'checkProfile')
  //   if (checkProfile) {
  //     const { senderData } = this.props.navigation.state.params;
  //     console.log(senderData, 'sender data')
  //     if (senderData.image != undefined) {
  //       this.setState({
  //         name: senderData.name,
  //         address: senderData.address,
  //         contactNo: senderData.contactNo,
  //         email: senderData.email,
  //         gender: senderData.gender,
  //         avatarSource: senderData.image,
  //         type: senderData.type,
  //         title: senderData.type,
  //         profileData: senderData,
  //         profile: 'opponentProfile'
  //       })
  //     }
  //     else {
  //       let obj = {
  //         userId: senderData.userId
  //       }
  //       let profileData = await HttpUtils.post('getProfile', obj);
  //       let dataProfile = profileData.content[0]
  //       if (profileData.mgs == 'User not created profile yet') {
  //         this.setState({
  //           name: senderData.name,
  //           type: senderData.type,
  //           title: senderData.type,
  //           profileData: senderData,
  //           profile: 'opponentProfile'
  //         })
  //       }
  //       else {
  //         this.setState({
  //           name: dataProfile.name,
  //           address: dataProfile.address,
  //           contactNo: dataProfile.contactNo,
  //           email: dataProfile.email,
  //           gender: dataProfile.gender,
  //           avatarSource: dataProfile.image,
  //           type: dataProfile.type,
  //           title: dataProfile.type.charAt(0).toUpperCase() + dataProfile.type.slice(1),
  //           profileData: dataProfile,
  //           profile: 'opponentProfile'
  //         })
  //       }
  //     }

  //   }
  //   else {
  //     AsyncStorage.getItem('myProfile').then((value) => {
  //       let userData = JSON.parse(value);
  //       console.log(userData, 'userData')
  //       if (userData.image != undefined) {
  //         console.log('proffile complete data')
  //         this.setState({
  //           name: userData.name,
  //           email: userData.email,
  //           type: userData.type,
  //           address: userData.address,
  //           contactNo: userData.contactNo,
  //           gender: userData.gender,
  //           avatarSource: userData.image,
  //           title: 'My',
  //           profileData: userData,
  //           profile: 'myProfile'
  //         })
  //       }
  //       else {
  //         console.log('user profile else condition', userData)
  //         this.setState({
  //           name: userData.name,
  //           email: userData.email,
  //           address: userData.address,
  //           contactNo: userData.contactNo,
  //           gender: userData.gender,
  //           type: userData.type,
  //           title: 'My',
  //           profileData: userData,
  //           profile: 'myProfile'
  //         })
  //       }
  //     })
  //   }

  // }
  // editForm = () => {
  //   const { profileData, profile } = this.state;
  //   this.props.navigation.navigate('EditProfileScreen', {
  //     profileData: profileData,
  //     profile: profile
  //   });
  // }

  // componentDidMount() {
  //   const { show } = this.state;
  //   this.props.navigation.setParams({ showEditForm: this.editForm, })
  // }

  render() {
    const { show, name, type, address, contactNo, email, gender, avatarSource, title, forTrainnerModal } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingStyle}>
            Profile
          </Text>
        </View>



        <View
          style={{ flex: 1, backgroundColor: 'white', }}>
          <View style={styles.profileContainer}>
            <View style={styles.profilPicContainer}>
              {
                avatarSource != '' ?
                  <Image style={styles.profilPicStyle} source={{ uri: `${avatarSource}` }} />
                  :
                  <Image source={require('../icons/profile.png')} style={styles.profilPicStyle} />
              }
              <View style={styles.nameContainer}>
                <Text style={styles.nameStyle}>Muhammad Sheeraz Khan</Text>
              </View>
              {/* <View style={styles.userTitle}>
                <Text style={styles.userTitleStyle}>{type}</Text>
              </View>
             </View>
          </View>
          <View style={styles.userInfoContainer}>
            <View>
              <Text style={styles.labelStyle}>Email</Text>
              <Text style={styles.userInsertedValueStyle}>{email}</Text>
            </View>
            <View style={styles.viewBlock}>
              <Text style={styles.labelStyle}>Address</Text>
              <Text style={styles.userInsertedValueStyle}>{address}</Text>
            </View>
            <View style={styles.viewBlock}>
              <Text style={styles.labelStyle}>Contact Number</Text>
              <Text style={styles.userInsertedValueStyle}>{contactNo}</Text>
            </View>
            <View style={styles.viewBlock}>
              <Text style={styles.labelStyle}>Gender</Text>
              <Text style={styles.userInsertedValueStyle}>{gender}</Text>
            </View>
            <View style={{ marginBottom: 10 }}>

            </View>
          </View>
          </ScrollView> */}

            </View>
          </View>


          <View style={styles.rowCont1}>
            <View style={styles.container}>
              <View>
                <Text style={styles.designationHead}>
                  Senior Service Provider
              </Text>

                <Text style={styles.Text2}>
                  Designation
                 </Text>

              </View>

              <View>
                <Text style={styles.ratingText}>
                  4.5/ 5
              </Text>
                <View>
                  <Text style={styles.Text2}>
                    Rating
                </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.rowCont2}>
            <View style={styles.container}>
              <View>
                <Text style={styles.designationHead}>
                  DHA
              </Text>
                <Text style={styles.Text2}>
                  Branch
                  </Text>
              </View>

              <View>
                <Text style={styles.ratingText}>
                  5 Years
              </Text>
                <Text style={styles.Text2}>
                  Experience
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={{ paddingTop: 20 }} onPress={() => this.setModalVisible(true)}>
            <Text>
              Show Modal
        </Text>
          </TouchableOpacity>


          {/* Modal Work Starts From Here */}

          <View style={styles.secmainContainer}>
            <View style={styles.childMainContainer}>
              <Modal style={{ marginHorizontal: 25 }}
                isVisible={this.state.forTrainnerModal}
                animationIn='zoomIn'
                //animationOut='zoomOutDown'
                backdropOpacity={0.9}
                backdropColor='transprent'
                transparent={true}
                backdropColor='white'
                coverScreen={true}
                animationInTiming={500}
                animationOutTiming={500}
              >


                {/* Modal Work */}
                <View style={styles.modaMainCont}>
                  <View style={styles.modalChildCont}>
                    <Text style={styles.modalTxt}>
                      Rate Muhammad Sheeraz Khan
                    </Text>
                    <View style={{ paddingTop: 5 }}>
                      <Text style={{ color: '#E5E5E5', }}>
                        How was your experience with Muhammad Sheeraz Khan.
                      </Text>
                    </View>
                  </View>

                  <View style={styles.starCont}>

                    <Rating
                      type='star'
                      imageSize={40}
                      selectedColor='#447BBE'
                      ratingBackgroundColor='red'
                      // showRating
                      onFinishRating={this.ratingCompleted}
                    // style={{ ratingColor: '#447BBE' }}
                    />
                  </View>

                  <View style={styles.container2}>
                    <Textarea
                      containerStyle={styles.textareaContainer}
                      style={styles.textarea}
                      onChangeText={this.onChange}
                      defaultValue={this.state.text}
                      placeholder={'Add Comments (Optional)'}
                      placeholderTextColor={'#555555'}
                      underlineColorAndroid={'transparent'}
                    />
                  </View>

                  {/* Submit button work starts from here */}

                  <View style={styles.subBtnCon}>
                    <View style={{ flexDirection: 'row', }}>
                      <TouchableOpacity
                        onPress={() => this.changeColor('addCart')}>
                        <Text style={this.state.addCartColor ?
                          styles.subchangeTextSt
                          :
                          styles.subTextSt}>
                          Submit rating
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => this.removeModal(true)}>
                        <Text style={styles.noThnkBtnTxt}>
                          No, Thanks
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>


                </View>
              </Modal>
            </View>
          </View>


        </View>
      </View>
    )
  }

}


export default Profile;