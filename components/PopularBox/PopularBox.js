import React, { Component } from 'react'
import axios from 'axios'
import styles from './PopularBox.module.scss'
import BoxItem from './BoxItem';
import SideRePanel from '../Ads/SideRePanel/SideRePanel';
import SideSectionTitle from '../SideSectionTitle/SideSectionTitle';
import Divider from '../Divider';

export default class PopularBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popular: {},
      popularLoaded: false
    }
  }

  componentDidMount() {
    axios.get("https://wpadmin.f1online.sk/wp-content/uploads/popular.json")
      .then(res => {
        this.setState({
          popular: res.data,
          popularLoaded: true
        })
      })
  }

  render() {
    return (
      <div className={styles.container}>
        <SideSectionTitle title="Kategórie" />
        <Divider height="10px" />
        {
          this.state.popularLoaded ? 
          
          this.state.popular.map((item, index) => {
            return (
              <BoxItem key={index} data={item} pickedSlug={this.props.pickedSlug}/>
            )
          }) :
          ""
        }
      </div>
    )
  }
}
