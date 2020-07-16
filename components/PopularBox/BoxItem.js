import React, { Component } from "react";
import styles from "./BoxItem.module.scss";
import Link from "next/link";

export default class BoxItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasChildren: props.data.slug.length === 0,
      opened: false
    };
    this.changeOpened = this.changeOpened.bind(this);
  }

  componentDidMount() {
    if(this.props.data.slug.length === 0) {
      this.props.data.subs.map((item) => {
        if(!this.props.opened && item.slug === this.props.pickedSlug) {
          this.setState({
            opened: true
          })
        }
        return null;
      })
    }
  }

  changeOpened() {
    this.setState(prev => {
      return {
        opened: !prev.opened
      };
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <div
          className={`${styles.header} ${
            this.props.data.slug === this.props.pickedSlug
              ? styles.selected
              : ""
          }`}
          onClick={() => this.changeOpened()}
        >
          {this.state.hasChildren ? (
            <>
              <span>{this.props.data.title}</span>
              <i
                className={`fas fa-chevron-${
                  this.state.opened ? "up" : "down"
                }`}
              ></i>
            </>
          ) : (
            <Link
              href={`/archiv/t/${this.props.data.slug}`}
              as={`/archiv/t/${this.props.data.slug}`}
            >
              <a>{this.props.data.title}</a>
            </Link>
          )}
        </div>
        {this.state.hasChildren ? (
          <div
            className={`${styles.body} ${
              this.state.opened ? styles.shown : styles.hidden
            }`}
          >
            {this.props.data.subs.map((item, index) => {
              return (
                <div key={index} className={`${styles.nestedHeader} ${
                  item.slug === this.props.pickedSlug
                    ? styles.selected
                    : ""
                }`}>
                  <i className="fas fa-circle"></i>
                  <Link
                    href={`/archiv/t/${item.slug}`}
                    as={`/archiv/t/${item.slug}`}
                  >
                    <a>{item.title}</a>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
