import React, { Component } from "react";
import Splash from "./components/splash";
import Navbar from "./components/navbar";
import Chat from "./components/chat/chat";
import Profile from "./components/profile/profile";
import Main from "./components/main";
import "./App.css";

export default class App extends Component {
  state = {
    user: {
      name: "Awesome Machinist",
      id:'',
      notifications: {
        Text: true,
        Email: false,
        "Do Not Disturb": {
          on: true,
          From: {
            hour: null,
            min: null,
            sec: null
          },
          To: {
            hour: null,
            min: null,
            sec: null
          }
        }
      }
    },
    cells: [],
    chats: {
      Machines: {
        "Machine 1": {
          chatFirstBegan: "12:30 pm",
          chatHistory: [
            ["machine", "Job 37TEAXEDI87 is done."],
            ["user", "Machine Utilization", 1565484493897],
            ["machine", "90% of utilization."]
          ],
          responses: {
            "Machine Utilization": "90% of utilization.",
            "Machine Health": "As healthy as your grandparents.",
            "Machine Status": "Code Red.",
            "Machine Maintenance": "Maintenance mandatory."
          }
        },
        "Eurotech 1": {
          chatFirstBegan: "12:30 pm",
          chatHistory: [
            ["machine", "Job 57HXET89EEA is done."],
            ["user", "Machine Utilization", 1565482493897],
            ["machine", "80% of utilization."]
          ],
          responses: {
            "Machine Utilization": "80% of utilization.",
            "Machine Health": "A solid B+.",
            "Machine Status": "Pretty solid.",
            "Machine Maintenance": "Maintenance optional."
          }
        },
        "Eurotech 2": {
          chatFirstBegan: "12:30 pm",
          chatHistory: [
            ["machine", "Job 99AYYOT6653 is done."],
            ["user", "Machine Utilization", 1565484453897],
            ["machine", "70% of utilization."]
          ],
          responses: {
            "Machine Utilization": "70% of utilization.",
            "Machine Health": "Not bad, but not great.",
            "Machine Status": "Don't worry about it, yet.",
            "Machine Maintenance": "Maintenance recommended."
          }
        },
        "Franz Cell 2": {
          chatFirstBegan: "12:30 pm",
          chatHistory: [
            ["machine", "Job 12389HAAU89 is done."],
            ["user", "Machine Utilization", 1565484775208],
            ["machine", "60% of utilization."]
          ],
          responses: {
            "Machine Utilization": "60% of utilization.",
            "Machine Health": "Straight A's like an Asian.",
            "Machine Status": "Strong as an ox.",
            "Machine Maintenance": "Maintenance would be a waste of money."
          }
        }
      },
      Parts: {
        "57HXET89EEA": {
          chatFirstBegan: "12:30 pm",
          chatHistory: [
            ["machine", "Participation in Job 37TEAXEDI87 is done."],
            ["user", "Part Utilization", 1565484493897],
            ["machine", "90% of utilization."]
          ],
          responses: {
            "Part Utilization": "90% of utilization.",
            "Part Health": "As healthy as your grandparents.",
            "Part Status": "Code Red.",
            "Part Maintenance": "Maintenance mandatory."
          }
        },
        "99AYYOT6653": {
          chatFirstBegan: "12:30 pm",
          chatHistory: [
            ["machine", "Participation in Job 99AYYOT6653 is done."],
            ["user", "Part Utilization", 1565484453897],
            ["machine", "70% of utilization."]
          ],
          responses: {
            "Part Utilization": "70% of utilization.",
            "Part Health": "Not bad, but not great.",
            "Part Status": "Don't worry about it, yet.",
            "Part Maintenance": "Maintenance recommended."
          }
        },
        "12389HAAU89": {
          chatFirstBegan: "12:30 pm",
          chatHistory: [
            ["machine", "Participation in Job 12389HAAU89 is done."],
            ["user", "Part Utilization", 1565484775208],
            ["machine", "60% of utilization."]
          ],
          responses: {
            "Part Utilization": "60% of utilization.",
            "Part Health": "Straight A's like an Asian.",
            "Part Status": "Strong as an ox.",
            "Part Maintenance": "Maintenance would be a waste of money."
          }
        }
      },
      Jobs: {
        "57HXET89EEA": {
          chatFirstBegan: "12:30 pm",
          chatHistory: [
            ["machine", "Job 57HXET89EEA is done."],
            ["user", "Job duration.", 1565484775208],
            ["machine", "5 hours 18 minutes."]
          ],
          responses: {
            "Job Duration": "5 hours 18 minutes.",
            "Job Result": "Failure.",
            "Job Notes": "Part 99AYYOT6653 failed 3 hours in."
          }
        },
        "99AYYOT6653": {
          chatFirstBegan: "12:30 pm",
          chatHistory: [
            ["machine", "Job 99AYYOT6653 is done."],
            ["user", "Job duration.", 1565484775208],
            ["machine", " 18 seconds."]
          ],
          responses: {
            "Job Duration": "18 seconds.",
            "Job Result": "Failure.",
            "Job Notes": "Part 12389HAAU89 was dead on arrival."
          }
        },
        "12389HAAU89": {
          chatFirstBegan: "12:30 pm",
          chatHistory: [
            ["machine", "Job 12389HAAU89 is done."],
            ["user", "Job duration.", 1565484775208],
            ["machine", "8 hours."]
          ],
          responses: {
            "Job Duration": "8 hours.",
            "Job Result": "Success.",
            "Job Notes": "Part 57HXET89EEA requires maintenance."
          }
        }
      }
    },
    machineSelected: null,
    loggedIn: false,
    toggledNavbarMenu: null,
    displayChat: null,
    displayProfile: null
  };

  componentDidMount = () => {
    this.fetchData("./data.json").then(data => {
      this.setState({
        cells: data
      });
    });
  };

  fetchData = async url => {
    const res = await fetch(url);
    return res.json();
  };

  logIn = async(Username, Password) => {

    await fetch(`https://www.matainventive.com/wp-json/custom-plugin/login?username=${Username}&password=${Password}`)
    .then(r=> r.json())
    .then(r=> {
      let id = this.state.user.id
      this.setState(prevState => ({
        loggedIn: true,
        id: r.ID
      }))
    })

    await fetch(`https://www.matainventive.com/cordovaserver/database/jsonmatastatusconfig.php?id=${this.state.user.id}`)
    .then(r=> r.json())
    .then(r=> {

      let emailNotif = this.state.user.notifications.Email

      if(r.alertenableemail === "1"){
        this.setState({ emailNotif: true })
      }else{
        this.setState({ emailNotif: false })
      }

    let textNotif = this.state.user.notifications.Text

     if(r.alertenablephone === "1"){
        this.setState({ textNotif: true })
      }else{
        this.setState({ textNotif: false })
      }
    })
  };

  // toggles between Overview and Floorplan views within Feed component based on toggled value from Footer component (currently removed)
  selectView = view => {
    this.setState({ viewSelected: view });
  };

  // this function is passed down as props all the way to Feed Item component to select a machine and view/interact with the machine's various tasks
  toggleMachineSelection = machInfo => {
    return () => {
      this.setState({ machineSelected: machInfo });
    };
  };

  // transition effects for chat submenu when clicking the navbar's left logo icon;
  // chat menu is positioned off of the viewport by an amount equal to its width until the logo icon is toggled, where it slides in as the app's Main component also slides off the viewport to the right by the same width.
  toggleNavbarMenu = type => {
    let menu, mainPos, mainTransform, sideMenuTransform;
    if (type !== null) {
      menu = type;
      mainPos = "fixed";
      mainTransform = type === "chat" ? "translateX(85vw)" : "translateX(-85vw)";
      sideMenuTransform = "none";
    } else {
      menu = this.state.toggledNavbarMenu;
      mainPos = "static";
      mainTransform = "none";
      sideMenuTransform = this.state.toggledNavbarMenu === "chat" ? "translateX(-85vw)" : "translateX(85vw)";
    }
    document.getElementById(menu).style.transform = sideMenuTransform;
    document.getElementById("nav").style.transform = mainTransform;
    document.getElementById("main").style.transform = mainTransform;
    document.getElementById("main").style.position = mainPos;
    this.setState({ toggledNavbarMenu: type });
  };

  // select chat stores both the type (Machine, Part, Job, etc..) and the specific chat within the type group
  selectChat = (type, chat) => {
    return () => {
      this.setState({ displayChat: [type, chat] });
      this.toggleNavbarMenu(null);
    };
  };

  hideChat = () => {
    this.setState({ displayChat: null });
    this.toggleNavbarMenu("chat");
  };

  sendNewMessage = (type, chat, message) => {
    let newChats = this.state.chats;
    let newMessage = ["user", message, Date.now()];
    newChats[type][chat].chatHistory.push(newMessage);
    this.setState({ chats: newChats });
    this.machineReplyMessage(type, chat, message);
  };

  machineReplyMessage = (type, chat, message) => {
    const replies = [
      "Error code 204, it's probably my fault.",
      "Error code 404, it's probably your fault.",
      "Error code 500, it's no one's fault. But I still have nothing for you."
    ];
    let newChats = this.state.chats;
    let replyMessage = newChats[type][chat].responses[message];
    // randomly samples a reply message from the replies array
    replyMessage = replyMessage
      ? replyMessage
      : replies[Math.floor(Math.random() * replies.length)];
    replyMessage = ["machine", replyMessage];
    newChats[type][chat].chatHistory.push(replyMessage);
    this.setState({ chats: newChats });
  };

  selectProfile = type => {
    return () => {
      this.setState({ displayProfile: type });
      this.toggleNavbarMenu(null);
    };
  };

  hideProfile = () => {
    this.setState({ displayProfile: null });
    this.toggleNavbarMenu("profile");
  };

  toggleNotification = type => {
    let userid = this.state.user.id
    let emailstate
    let textstate
    let alertemail = this.state.user.notifications.Email
    let alerttext = this.state.user.notifications.Text

    if (this.state.user.notifications.Email === true){
     emailstate = 1
    }else{
      emailstate = 0
    }

    if (this.state.user.notifications.Text === true){
       textstate = 1
    }else{
       textstate = 0
    }
    
     fetch('https://www.matainventive.com/cordovaserver/database/togglealertconfig.php',
    {
      method: 'POST',
      headers:
        {
          'Accept': 'application/json',
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Sec-Fetch-Mode": "cors",
        },
      body: "userid="+userid+"&emailstate="+emailstate+"&textstate="+textstate+"&insert=",
    })

    //below we are toggling the users attribute of specific categories being in do not disturb mode or not.
    	// var dataString="userid="+title+"&emailstate="+emailstate+"&textstate="+textstate+"&insert=";
    	// // $("#alertwarning").text("");
    	// if($.trim(title).length>0)
    	// {
    	// 	$.ajax({
    	// 		type: "POST",
    	// 		url:"https://www.matainventive.com/cordovaserver/database/togglealertconfig.php",
    	// 		data: dataString,
    	// 		crossDomain: true,
    	// 		cache: false,
    	// 		beforeSend: function(){ $("#insertalert").val('Connecting...');},
    	// 		success: function(data){
    	// 		if(data=="success")
    	// 			{
    	// 			}
    	// 		else if(data=="error")
    	// 			{
    	// 			}
    	// 		}
    	// 	});
    	// }

    return () => {
      let newUser = this.state.user;
      if (type === "Do Not Disturb") {
        newUser.notifications[type].on = !newUser.notifications[type].on;
      } else {
        newUser.notifications[type] = !newUser.notifications[type];
      }
      this.setState({ user: newUser });
    }
  }

  render = () => {
    if (!this.state.loggedIn) {
      return <Splash logIn={this.logIn} />;
    } else {
      return (
        <div className="app-container">
          <div
            className="overlay"
            onClick={() => this.toggleNavbarMenu(null)}
            style={{
              display: this.state.toggledNavbarMenu ? "block" : "none"
            }}
          />
          <span id="chat" className="chat-wrapper">
            <Chat selectChat={this.selectChat} chats={this.state.chats} />
          </span>
          <div>
            <Navbar
              toggleNavbarMenu={this.toggleNavbarMenu}
              displayChat={this.state.displayChat}
              displayProfile={this.state.displayProfile}
              hideChat={this.hideChat}
              hideProfile={this.hideProfile}
            />
            <Main
              user={this.state.user}
              cells={this.state.cells}
              chats={this.state.chats}
              displayChat={this.state.displayChat}
              displayProfile={this.state.displayProfile}
              sendNewMessage={this.sendNewMessage}
              toggleNotification={this.toggleNotification}
              machineSelected={this.state.machineSelected}
              toggleMachineSelection={this.toggleMachineSelection}
            />
          </div>
          <span id="profile" className="profile-wrapper">
            <Profile userName={this.state.user.name} selectProfile={this.selectProfile} />
          </span>
        </div>
      );
    }
  };
}
