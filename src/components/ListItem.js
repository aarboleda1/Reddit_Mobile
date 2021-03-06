import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  Text, 
  Image,
  View, 
  TouchableWithoutFeedback, 
  Dimensions 
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as actions from '../actions';

import { timeDifference, validateImage } from './helpers';

import { 
  CardSection, 
  Card, 
  Button 
} from './common';

const propTypes = {
  item: PropTypes.object,
  selected: PropTypes.bool  
};

class ListItem extends Component {
  goToSelectedItemPage(data) {
    Actions.selectedItem(data);
  }

  render() {
    const { 
      url, 
      id, 
      author, 
      thumbnail, 
      title, 
      ups, 
      num_comments, 
      domain, 
      created_utc, 
      downs, 
      subreddit_name_prefixed 
    } = this.props.item.data;
    const { data } = this.props.item;
    const bulletPoint = ' \u2022 ';
    const {
      titleStyle, 
      postInfo, 
      headerContentStyle, 
      headerTextStyle, 
      imageStyle,
      articleDetails,
      thumbnailStyle,
      headerContainerStyle
    } = styles;
    
    return (
    <TouchableWithoutFeedback
      onPress={ () => this.goToSelectedItemPage(data) }
    >
    <View>
      <Card>
      <CardSection>
        <View style={ headerContainerStyle }>
          <Text 
            numberOfLines={ 4 } 
            style={ headerTextStyle }>{ title }
          </Text>   
          <Image 
            source={ validateImage(this.props.item.data.thumbnail) }
            style={ thumbnailStyle } 
          />
        </View>
      </CardSection>        
        <CardSection>
            <Text 
              style={ postInfo }
            > 
              { subreddit_name_prefixed } 
              { bulletPoint } 
              { timeDifference(created_utc) } 
              { bulletPoint }submitted by: { author }
            </Text>
        </CardSection>  
        <CardSection> 
            <Text style={ articleDetails }>Upvotes: { ups.toLocaleString() } |</Text>
            <Text style={ articleDetails }> Downvotes: { downs.toLocaleString() } |</Text>              
            <Text style={ articleDetails }> Comments: { num_comments.toLocaleString() }</Text>
        </CardSection>
      </Card>
    </View>
    </TouchableWithoutFeedback>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const selected = state.selectedItemId === ownProps.item.data.id;
  return { selected };
};

export default connect(mapStateToProps, actions)(ListItem);
const { height, width } = Dimensions.get('window');
const styles = {
  titleStyle: {
    fontSize: 18, 
    paddingLeft: 15,
    color: '#F0F8FF'
  },  
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1
  },
  headerTextStyle: {
    fontSize: 18,
    fontWeight: '600',
    width: Math.round(width * .66),
    color: '#657786'
  },
  imageStyle: {
    height: 200,
    flex: 1,
    width: null
  },
  thumbnailStyle: {
    height: 80,
    width: 80,
    borderRadius: 4
  },
  articleDetails: {
    fontSize: 11,
    color: '#657786',
    paddingLeft: 4,     
  },
  headerContainerStyle: {
    display: 'flex', 
    flexDirection: 'row', 
    flex: 1, 
    justifyContent: 'space-between', 
    paddingRight: 4, 
    paddingLeft: 4, 
    paddingTop: 4
  },
  postInfo: {
    fontSize: 12,
    color: '#657786',
    paddingLeft: 4,     
  }
};

ListItem.propTypes = propTypes;