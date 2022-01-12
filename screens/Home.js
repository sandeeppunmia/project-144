import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import axios from 'axios';

export default class HomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            article_details:{}
        };
    }

    componentDidMount(){
        this.getArticle();
    }

    getArticle=()=>{
        const url="http://127.0.0.1:5000/get-articles"
        /*Axios is a promise-based HTTP Client for node. ... 
        It is isomorphic (= it can run in the browser and nodejs with the same codebase). 
        On the server-side it uses the native node. js http module, while on the client 
        (browser) it uses XMLHttpRequests.*/
        axios
         .get(url)
         .then(response=>{
             let details = response.data.data;
             this.setState({article_details:details});
         })
         .catch(error=>{
             console.log(error.message)
         });
    };

    likedArticle=()=>{
        const url = "http://localhost:5000/liked-articles";
        axios
         .post(url)
         .then(response=>{
             this.getArticle();
         })
         .catch(error=>{
             console.log(error.message);
         })
    }

    unlikedArticles=()=>{
        const url = "http://localhost:5000/unliked-articles";
        axios
         .post(url)
         .then(response=>{
             this.getArticle();
         })
         .catch(error=>{
             console.log(error.message);
         })
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Header
                    centerComponent={{
                        text:"Articles",
                        style:styles.headerTitle
                    }}
                    />
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>

                <View style={{ flex: 0.7, padding: 15 }}>
                  <Text style={styles.text}>{text}</Text>
                </View>

                <TouchableOpacity onPress={this.likedArticle}>
                    <Icon
                      reverse
                      name={"check"}
                      type={"entypo"}
                      size={RFValue(30)}
                      color={"#76ff03"}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={this.unlikedArticles}>
                    <Icon
                      reverse
                      name={"cross"}
                      type={"entypo"}
                      size={RFValue(30)}
                      color={"#ff1744"}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
      },
      headerContainer: {
        flex: 0.1
      },
      headerTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: RFValue(18)
      },
      titleContainer: {
        flex: 0.2,
        alignItems: "center"
      },
      title: {
        fontSize: RFValue(20),
        fontWeight: "bold",
        textAlign: "center"
      },
      text: {
        fontSize: RFValue(13),
        textAlign: "center",
        fontWeight: "300",
        color: "gray"
      },
})