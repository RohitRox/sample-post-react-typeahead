import React, { Component } from 'react';

import { Typeahead } from 'react-typeahead';

export default class SamplePostTypeahead extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      selectedPost: null
    };
  }

  resetState() {
    this.setState({
      posts: [],
      selectedPost: null
    });
  }

  setData(data) {
    this.setState({
      posts: data.map( (post)=> { return post.title })
    });
  }

  fetchSuggestions(value) {
    $.getJSON('http://jsonplaceholder.typicode.com/posts?userId=1', this.setData.bind(this));
  }

  onChange(e) {
    const value = e.currentTarget.value.trim();
    const minLength = this.props.minLength || 1;

    if (value.length === 0) {
      this.resetState();
    } else if (value.length >= minLength) {
      this.fetchSuggestions(value);
    }
  }

  onOptionSelected(post) {
    this.setState({
      selectedPost: post
    })
  }

  getSelection() {
    return <p>{this.state.selectedPost}</p>;
  }

  displayOption(option, index) {
    return option.substr(0,10);
  }

  render () {
    return (
      <div>
        <Typeahead
          ref='typeaheadSearch'
          maxVisible={10}
          placeholder={this.props.placeholder}
          onOptionSelected={this.onOptionSelected.bind(this)}
          options={this.state.posts}
          onChange={this.onChange.bind(this)}
          displayOption={this.displayOption.bind(this)}
        />
        { this.state.selectedPost && this.getSelection() }
      </div>
    );
  }

}
