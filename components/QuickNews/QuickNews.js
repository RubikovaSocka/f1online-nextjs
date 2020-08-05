import React, { Component } from "react";
import axios from "axios";
import Link from "next/link";
import ButtonWB from "../ButtonWB/ButtonWB.js";
import styles from "./QuickNews.module.scss";
import formatDate from "../../utils/dateFormatter";
import SideSectionTitle from "../SideSectionTitle/SideSectionTitle";
import LinkAsButton from "../LinkAsButton/LinkAsButton";
import LoadingSpinner from "../LoadingSpinner";
import EmbedFullscreen from "./EmbedFullscreen.js";
import Popup from "reactjs-popup";
import InfiniteScroll from "react-infinite-scroll-component";

class OneLineNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
  }

  render() {
    const { hasvideo, content, date, embed } = this.props;
    return (
      <div className={styles.newsItemContainer}>
        <p className={styles.date}>{date}</p>
        <div className={`${styles.messageContainer}`}>
          <div
            className={`${styles.message} ${
              hasvideo && hasvideo === "Áno"
                ? `${styles.icon} ${styles.video}`
                : embed.length > 0
                ? `${styles.icon} ${styles.post}`
                : ""
            }`}
            dangerouslySetInnerHTML={{ __html: content }}
            onClick={this.props.callback}
          />
        </div>
      </div>
      /*
      <div className={styles.newsItemContainer}>
      <p className={styles.date}>{date}</p>
      <div className={`${styles.messageContainer}`}>
        <Popup
          trigger={
            <div
              className={`${styles.message} ${
                hasvideo && hasvideo === "Áno"
                  ? `${styles.icon} ${styles.video}`
                  : embed.length > 0
                  ? `${styles.icon} ${styles.post}`
                  : ""
              }`}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          }
          lockScroll
          modal
          closeOnDocumentClick={false}
        >
          {close => <EmbedFullscreen {...this.props} hideClick={close} />}
        </Popup>
      </div>
    </div>*/
    );
  }
}

export default class QuickNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsArray: [],
      isLoaded: false,
      shownItemIndex: 0,
      isShown: false,
      hasMore: true
    };
    this.showNewsItem = this.showNewsItem.bind(this);
    this.hideNewsItem = this.hideNewsItem.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        `https://wpadmin.f1online.sk/wp-json/wp/v2/rychle_spravy?per_page=15`
      )
      .then(res =>
        this.setState({
          newsArray: res.data,
          isLoaded: true
        })
      );
  }

  showNewsItem(id) {
    this.setState({
      shownItemIndex: id,
      isShown: true
    });
  }

  hideNewsItem() {
    this.setState({
      shownItemIndex: 0,
      isShown: false
    });
  }

  fetchMoreData = () => {
    axios
      .get(
        `https://wpadmin.f1online.sk/wp-json/wp/v2/rychle_spravy?per_page=15&offset=${this.state.newsArray.length}`
      )
      //.then(res => console.log(res))
      .then(res =>
        this.setState({
          newsArray: this.state.newsArray.concat(res.data),
          hasMore: res.data.length === 15
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    const { newsArray } = this.state;

    let newsTriggersArray = newsArray.map((newsItem, index) => (
      <OneLineNews
        key={index}
        id={newsItem.id}
        date={formatDate(newsItem.date)}
        content={newsItem.acf.obsah_rychlej_spravy}
        embed={newsItem.acf.embed_zo_socialnych_sieti}
        hasvideo={newsItem.acf.hasvideo}
        callback={() => this.showNewsItem(index)}
      />
    ));

    return (
      <div className={styles.quicknewsContainer}>
        <SideSectionTitle title="Rýchle správy" />
        {this.state.isShown ? (
          <Popup
            trigger={""}
            lockScroll
            modal
            open={true}
            closeOnDocumentClick={false}
          >
            {close => (
              <EmbedFullscreen
                {...newsTriggersArray[this.state.shownItemIndex].props}
                hideClick={close}
                hidePopup={this.hideNewsItem}
              />
            )}
          </Popup>
        ) : (
          ""
        )}
        {this.state.isLoaded ? (
          <>
            <InfiniteScroll
              dataLength={newsArray.length}
              next={this.fetchMoreData}
              hasMore={this.state.hasMore}
              loader={<LoadingSpinner />}
              height={480}
              endMessage={
                <p style={{ fontFamily: "HK Grotesk", textAlign: "center" }}>
                  <b>Toto bola posledná rýchla správa.</b>
                </p>
              }
            >
              {newsArray.map((newsItem, index) => (
                <OneLineNews
                  key={index}
                  id={newsItem.id}
                  date={formatDate(newsItem.date)}
                  content={newsItem.acf.obsah_rychlej_spravy}
                  embed={newsItem.acf.embed_zo_socialnych_sieti}
                  hasvideo={newsItem.acf.hasvideo}
                  callback={() => this.showNewsItem(index)}
                />
              ))}
            </InfiniteScroll>
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    );
  }
}
/*
export async function getServerSideProps({ params }) {
  const response = await axios({
    method: "get",
    url: `https://wpadmin.f1online.sk/wp-json/wp/v2/rychle_spravy?per_page=15`
  });

  return {
    props: {
      id: params.id,
      postsData: response.data
    }
  };
}
*/