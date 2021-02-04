import { gql } from "apollo-boost";

export const POST_FRAGMENT = gql`
  fragment PostParts on Post {
    id
    location
    caption
    user {
      id
      isSelf
      avatar
      username
    }
    files {
      id
      url
    }
    likeCount
    isLiked
    comments {
      id
      text
      user {
        id
        username
      }
    }
    createdAt
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    avatar
    username
    fullName
    firstName
    lastName
    isFollowing
    isSelf
    bio
    followingCount
    followersCount
    postsCount
    posts {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;
export const STORY_FRAGMENT = gql`
  fragment StoryParts on Story {
  id
files {
      id
      url
    }
caption
user {
      id
      isSelf
      avatar
      username
    }
tagUser{
      id
      isSelf
      avatar
      username
    }
seenUsers{
      id
      isSelf
      avatar
      username
    }
  }
`;