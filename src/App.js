import React, { Component } from "react";
import Splash from "./components/splash";
import Navbar from "./components/navbar";
import Chat from "./components/chat/chat";
import Main from "./components/main";
import "./App.css";

export default class App extends Component {
  state = {
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
            ["machine", "57HXET89EEA is done."],
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
      Parts: { "57HXET89EEA": [[]], "99AYYOT6653": [[]], "12389HAAU89": [[]] },
      Jobs: { "57HXET89EEA": [[]], "99AYYOT6653": [[]], "12389HAAU89": [[]] }
    },
    machineSelected: null,
    loggedIn: false,
    toggledLeftChatMenu: false,
    displayChat: null
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

  logIn = () => {
    this.setState({ loggedIn: true });
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
  toggleChatMenu = () => {
    const toggledLeftChatMenu = this.state.toggledLeftChatMenu;
    const chatTransform = toggledLeftChatMenu ? "translateX(-85vw)" : "none";
    const navTransform = toggledLeftChatMenu ? "none" : "translateX(85vw)";
    const mainTransform = toggledLeftChatMenu ? "none" : "translateX(85vw)";
    const mainPos = toggledLeftChatMenu ? "static" : "fixed";
    document.getElementById("chat").style.transform = chatTransform;
    document.getElementById("nav").style.transform = navTransform;
    document.getElementById("main").style.transform = mainTransform;
    document.getElementById("main").style.position = mainPos;

    this.setState({ toggledLeftChatMenu: !this.state.toggledLeftChatMenu });
  };

  selectChat = (type, chat) => {
    return () => {
      this.setState({ displayChat: [type, chat] });
      this.toggleChatMenu();
    };
  };

  hideChat = () => {
    this.setState({ displayChat: null });
    this.toggleChatMenu();
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
      "Error code 500, it's no one's fault. But I still have nothing for you.",
    ]
    let newChats = this.state.chats;
    let replyMessage = newChats[type][chat].responses[message];
    // randomly samples a reply message from the replies array
    replyMessage = replyMessage ? replyMessage : replies[Math.floor(Math.random() * replies.length)];
    replyMessage = ["machine", replyMessage];
    newChats[type][chat].chatHistory.push(replyMessage);
    this.setState({ chats: newChats });
  }

  render = () => {
    if (!this.state.loggedIn) {
      return <Splash logIn={this.logIn} />;
    } else {
      return (
        <div className="app-container">
          <div
            className="overlay"
            onClick={this.toggleChatMenu}
            style={{
              display: this.state.toggledLeftChatMenu ? "block" : "none"
            }}
          />
          <span id="chat" className="chat-wrapper">
            <Chat selectChat={this.selectChat} chats={this.state.chats} />
          </span>
          <div>
            <Navbar
              toggleChatMenu={this.toggleChatMenu}
              displayChat={this.state.displayChat}
              hideChat={this.hideChat}
            />
            <Main
              cells={this.state.cells}
              chats={this.state.chats}
              displayChat={this.state.displayChat}
              sendNewMessage={this.sendNewMessage}
              machineSelected={this.state.machineSelected}
              toggleMachineSelection={this.toggleMachineSelection}
            />
          </div>
        </div>
      );
    }
  };
}
