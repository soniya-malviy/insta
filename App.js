import React, { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

const currentUser = {
  name: 'Soniya Malviya',
  username: 'soniya.creates',
  bio: 'Building moments, reels, and tiny product ideas.',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&h=240&fit=crop&crop=faces',
  website: 'soniya.design'
};

const people = [
  {
    id: 'ava',
    name: 'Ava Brooks',
    username: 'ava.brooks',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=240&h=240&fit=crop&crop=faces',
    reason: 'Followed by Neha and 8 others'
  },
  {
    id: 'leo',
    name: 'Leo Martin',
    username: 'leomakes',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&h=240&fit=crop&crop=faces',
    reason: 'Popular creator near you'
  },
  {
    id: 'mia',
    name: 'Mia Chen',
    username: 'mialens',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&h=240&fit=crop&crop=faces',
    reason: 'New to InstaClone'
  },
  {
    id: 'neha',
    name: 'Neha Rao',
    username: 'neharao',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=240&h=240&fit=crop&crop=faces',
    reason: 'In your contacts'
  },
  {
    id: 'kai',
    name: 'Kai Singh',
    username: 'kai.visuals',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=240&h=240&fit=crop&crop=faces',
    reason: 'Followed by Ava'
  }
];

const stories = [
  { id: 'you', name: 'Your story', avatar: currentUser.avatar, own: true },
  ...people.map((person) => ({ id: person.id, name: person.name.split(' ')[0], avatar: person.avatar }))
];

const feedPosts = [
  {
    id: 'p1',
    user: people[0],
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&h=900&fit=crop',
    caption: 'Golden hour walk and a camera roll full of ideas.',
    likes: 2480,
    comments: 96,
    time: '12m'
  },
  {
    id: 'p2',
    user: people[1],
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&h=900&fit=crop',
    caption: 'The mountains always make the week quieter.',
    likes: 1188,
    comments: 41,
    time: '38m'
  },
  {
    id: 'p3',
    user: people[2],
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&h=900&fit=crop',
    caption: 'City lights, coffee, and a tiny sprint plan.',
    likes: 734,
    comments: 18,
    time: '1h'
  }
];

const userPosts = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=500&h=500&fit=crop'
];

const reels = [
  {
    id: 'r1',
    title: 'Workspace refresh',
    creator: currentUser.username,
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=900&fit=crop',
    plays: '14.2K'
  },
  {
    id: 'r2',
    title: 'Coffee run edit',
    creator: 'mialens',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=900&fit=crop',
    plays: '8.7K'
  },
  {
    id: 'r3',
    title: 'Street colors',
    creator: 'kai.visuals',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&h=900&fit=crop',
    plays: '23K'
  }
];

const profileStats = [
  ['Posts', '36'],
  ['Followers', '12.8K'],
  ['Following', '312']
];

const tabs = [
  { key: 'home', label: 'Home', icon: '⌂' },
  { key: 'search', label: 'Search', icon: '⌕' },
  { key: 'add', label: 'Add', icon: '+' },
  { key: 'reels', label: 'Reels', icon: '▻' },
  { key: 'profile', label: 'Profile', icon: '◉' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [profileView, setProfileView] = useState('posts');
  const [listView, setListView] = useState(null);
  const [following, setFollowing] = useState(new Set(['ava', 'neha', 'kai']));
  const [caption, setCaption] = useState('');

  const followingPeople = useMemo(
    () => people.filter((person) => following.has(person.id)),
    [following]
  );

  const followersPeople = people;

  const toggleFollow = (id) => {
    setFollowing((previous) => {
      const next = new Set(previous);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const openProfile = () => {
    setActiveTab('profile');
    setListView(null);
  };

  const renderScreen = () => {
    if (listView) {
      return (
        <PeopleList
          title={listView === 'followers' ? 'Followers' : 'Following'}
          people={listView === 'followers' ? followersPeople : followingPeople}
          following={following}
          onBack={() => setListView(null)}
          onToggleFollow={toggleFollow}
        />
      );
    }

    if (activeTab === 'home') {
      return <HomeScreen following={following} onToggleFollow={toggleFollow} />;
    }

    if (activeTab === 'search') {
      return <SearchScreen following={following} onToggleFollow={toggleFollow} />;
    }

    if (activeTab === 'add') {
      return <AddPostScreen caption={caption} setCaption={setCaption} onProfile={openProfile} />;
    }

    if (activeTab === 'reels') {
      return <ReelsScreen />;
    }

    return (
      <ProfileScreen
        profileView={profileView}
        setProfileView={setProfileView}
        following={following}
        onToggleFollow={toggleFollow}
        onOpenList={setListView}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.appShell}>
        {renderScreen()}
        {!listView && (
          <View style={styles.tabBar}>
            {tabs.map((tab) => (
              <Pressable
                key={tab.key}
                accessibilityRole="button"
                accessibilityLabel={tab.label}
                style={[styles.tabButton, activeTab === tab.key && styles.tabButtonActive]}
                onPress={() => {
                  setActiveTab(tab.key);
                  setListView(null);
                }}
              >
                <Text style={[styles.tabIcon, activeTab === tab.key && styles.tabIconActive]}>
                  {tab.icon}
                </Text>
                <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
                  {tab.label}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

function Header({ title = 'InstaClone', right }) {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>{title}</Text>
      <View style={styles.headerActions}>
        {right}
        <Pressable style={styles.iconButton}>
          <Text style={styles.iconButtonText}>♡</Text>
        </Pressable>
        <Pressable style={styles.iconButton}>
          <Text style={styles.iconButtonText}>✉</Text>
        </Pressable>
      </View>
    </View>
  );
}

function StoriesRail() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesRail}>
      {stories.map((story) => (
        <Pressable key={story.id} style={styles.storyItem}>
          <View style={[styles.storyRing, story.own && styles.ownStoryRing]}>
            <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
            {story.own && (
              <View style={styles.addStoryBadge}>
                <Text style={styles.addStoryText}>+</Text>
              </View>
            )}
          </View>
          <Text numberOfLines={1} style={styles.storyName}>{story.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

function HomeScreen({ following, onToggleFollow }) {
  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBottom}>
        <StoriesRail />
        {feedPosts.map((post) => (
          <FeedPost
            key={post.id}
            post={post}
            isFollowing={following.has(post.user.id)}
            onToggleFollow={() => onToggleFollow(post.user.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function FeedPost({ post, isFollowing, onToggleFollow }) {
  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: post.user.avatar }} style={styles.avatarSmall} />
        <View style={styles.postUserBlock}>
          <Text style={styles.username}>{post.user.username}</Text>
          <Text style={styles.mutedText}>{post.time} ago</Text>
        </View>
        <Pressable style={[styles.followPill, isFollowing && styles.followingPill]} onPress={onToggleFollow}>
          <Text style={[styles.followPillText, isFollowing && styles.followingPillText]}>
            {isFollowing ? 'Following' : 'Follow'}
          </Text>
        </Pressable>
      </View>
      <Image source={{ uri: post.image }} style={styles.postImage} />
      <View style={styles.postActions}>
        <Text style={styles.actionIcon}>♡</Text>
        <Text style={styles.actionIcon}>◌</Text>
        <Text style={styles.actionIcon}>↗</Text>
        <Text style={styles.bookmarkIcon}>□</Text>
      </View>
      <View style={styles.postBody}>
        <Text style={styles.boldText}>{post.likes.toLocaleString()} likes</Text>
        <Text style={styles.caption}>
          <Text style={styles.boldText}>{post.user.username} </Text>
          {post.caption}
        </Text>
        <Text style={styles.mutedText}>View all {post.comments} comments</Text>
      </View>
    </View>
  );
}

function SearchScreen({ following, onToggleFollow }) {
  return (
    <View style={styles.screen}>
      <Header title="Explore" right={<SearchBox />} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBottom}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>People you may know</Text>
          <Text style={styles.sectionHint}>Suggested</Text>
        </View>
        {people.map((person) => (
          <PersonRow
            key={person.id}
            person={person}
            isFollowing={following.has(person.id)}
            onToggleFollow={() => onToggleFollow(person.id)}
          />
        ))}
        <View style={styles.grid}>
          {[...userPosts, ...feedPosts.map((post) => post.image)].map((image, index) => (
            <Image key={`${image}-${index}`} source={{ uri: image }} style={styles.gridImage} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function SearchBox() {
  return (
    <View style={styles.searchBox}>
      <Text style={styles.searchIcon}>⌕</Text>
      <Text style={styles.searchPlaceholder}>Search</Text>
    </View>
  );
}

function AddPostScreen({ caption, setCaption, onProfile }) {
  const preview = userPosts[0];

  return (
    <View style={styles.screen}>
      <Header title="New post" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContent}>
        <Image source={{ uri: preview }} style={styles.composerPreview} />
        <TextInput
          multiline
          value={caption}
          onChangeText={setCaption}
          placeholder="Write a caption..."
          placeholderTextColor="#8e8e93"
          style={styles.captionInput}
        />
        <View style={styles.composerTools}>
          {['Tag people', 'Add location', 'Share as reel', 'Advanced settings'].map((item) => (
            <Pressable key={item} style={styles.settingRow}>
              <Text style={styles.settingText}>{item}</Text>
              <Text style={styles.settingArrow}>›</Text>
            </Pressable>
          ))}
        </View>
        <Pressable style={styles.primaryButton} onPress={onProfile}>
          <Text style={styles.primaryButtonText}>Share prototype post</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function ReelsScreen() {
  return (
    <View style={styles.screenDark}>
      <View style={styles.reelsHeader}>
        <Text style={styles.reelsTitle}>Reels</Text>
        <Text style={styles.reelsCamera}>▣</Text>
      </View>
      <ScrollView pagingEnabled showsVerticalScrollIndicator={false}>
        {reels.map((reel) => (
          <View key={reel.id} style={styles.reelCard}>
            <Image source={{ uri: reel.image }} style={styles.reelImage} />
            <View style={styles.reelOverlay}>
              <View>
                <Text style={styles.reelCreator}>@{reel.creator}</Text>
                <Text style={styles.reelCaption}>{reel.title}</Text>
                <Text style={styles.reelMeta}>{reel.plays} plays</Text>
              </View>
              <View style={styles.reelActions}>
                <Text style={styles.reelAction}>♡</Text>
                <Text style={styles.reelAction}>◌</Text>
                <Text style={styles.reelAction}>↗</Text>
                <Text style={styles.reelAction}>⋯</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function ProfileScreen({ profileView, setProfileView, following, onToggleFollow, onOpenList }) {
  return (
    <View style={styles.screen}>
      <Header title={currentUser.username} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBottom}>
        <View style={styles.profileTop}>
          <Image source={{ uri: currentUser.avatar }} style={styles.profileAvatar} />
          <View style={styles.statRow}>
            {profileStats.map(([label, value]) => (
              <Pressable
                key={label}
                style={styles.stat}
                onPress={() => {
                  if (label === 'Followers') {
                    onOpenList('followers');
                  }
                  if (label === 'Following') {
                    onOpenList('following');
                  }
                }}
              >
                <Text style={styles.statValue}>{value}</Text>
                <Text style={styles.statLabel}>{label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.profileBio}>
          <Text style={styles.boldText}>{currentUser.name}</Text>
          <Text style={styles.bioText}>{currentUser.bio}</Text>
          <Text style={styles.linkText}>{currentUser.website}</Text>
        </View>
        <View style={styles.profileButtons}>
          <Pressable style={styles.profileButton}>
            <Text style={styles.profileButtonText}>Edit profile</Text>
          </Pressable>
          <Pressable style={styles.profileButton}>
            <Text style={styles.profileButtonText}>Share profile</Text>
          </Pressable>
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Who you know</Text>
          <Text style={styles.sectionHint}>From contacts</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionRail}>
          {people.map((person) => (
            <View key={person.id} style={styles.suggestionCard}>
              <Image source={{ uri: person.avatar }} style={styles.suggestionAvatar} />
              <Text numberOfLines={1} style={styles.username}>{person.username}</Text>
              <Text numberOfLines={2} style={styles.suggestionReason}>{person.reason}</Text>
              <Pressable
                style={[styles.followPill, following.has(person.id) && styles.followingPill]}
                onPress={() => onToggleFollow(person.id)}
              >
                <Text style={[styles.followPillText, following.has(person.id) && styles.followingPillText]}>
                  {following.has(person.id) ? 'Following' : 'Follow'}
                </Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>
        <View style={styles.profileTabs}>
          {['posts', 'reels'].map((view) => (
            <Pressable
              key={view}
              style={[styles.profileTab, profileView === view && styles.profileTabActive]}
              onPress={() => setProfileView(view)}
            >
              <Text style={[styles.profileTabText, profileView === view && styles.profileTabTextActive]}>
                {view === 'posts' ? 'Posts' : 'Reels'}
              </Text>
            </Pressable>
          ))}
        </View>
        {profileView === 'posts' ? (
          <View style={styles.grid}>
            {userPosts.map((image) => (
              <Image key={image} source={{ uri: image }} style={styles.gridImage} />
            ))}
          </View>
        ) : (
          <View style={styles.reelsGrid}>
            {reels.map((reel) => (
              <View key={reel.id} style={styles.miniReel}>
                <Image source={{ uri: reel.image }} style={styles.miniReelImage} />
                <Text style={styles.miniReelText}>▻ {reel.plays}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function PeopleList({ title, people: listPeople, following, onBack, onToggleFollow }) {
  return (
    <View style={styles.screen}>
      <View style={styles.listHeader}>
        <Pressable style={styles.iconButton} onPress={onBack}>
          <Text style={styles.iconButtonText}>‹</Text>
        </Pressable>
        <Text style={styles.listTitle}>{title}</Text>
        <View style={styles.iconButton} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
        {listPeople.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No people here yet</Text>
            <Text style={styles.emptyText}>Follow suggestions from Explore to build this list.</Text>
          </View>
        ) : (
          listPeople.map((person) => (
            <PersonRow
              key={person.id}
              person={person}
              isFollowing={following.has(person.id)}
              onToggleFollow={() => onToggleFollow(person.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

function PersonRow({ person, isFollowing, onToggleFollow }) {
  return (
    <View style={styles.personRow}>
      <Image source={{ uri: person.avatar }} style={styles.avatarMedium} />
      <View style={styles.personText}>
        <Text style={styles.username}>{person.username}</Text>
        <Text style={styles.mutedText}>{person.name}</Text>
        <Text numberOfLines={1} style={styles.reasonText}>{person.reason}</Text>
      </View>
      <Pressable style={[styles.followPill, isFollowing && styles.followingPill]} onPress={onToggleFollow}>
        <Text style={[styles.followPillText, isFollowing && styles.followingPillText]}>
          {isFollowing ? 'Following' : 'Follow'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  appShell: {
    flex: 1,
    backgroundColor: '#fff'
  },
  screen: {
    flex: 1,
    backgroundColor: '#fff'
  },
  screenDark: {
    flex: 1,
    backgroundColor: '#050505'
  },
  scrollBottom: {
    paddingBottom: 96
  },
  header: {
    minHeight: 58,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dedede',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  logo: {
    fontSize: 25,
    fontWeight: '800',
    color: '#111'
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconButtonText: {
    fontSize: 24,
    color: '#111',
    lineHeight: 28
  },
  storiesRail: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dedede'
  },
  storyItem: {
    width: 82,
    alignItems: 'center',
    paddingVertical: 12
  },
  storyRing: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: '#d62976',
    padding: 3
  },
  ownStoryRing: {
    borderColor: '#c7c7cc'
  },
  storyAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 29
  },
  addStoryBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#0095f6',
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addStoryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 18
  },
  storyName: {
    maxWidth: 74,
    marginTop: 5,
    fontSize: 12,
    color: '#222'
  },
  postCard: {
    backgroundColor: '#fff',
    borderBottomWidth: 8,
    borderBottomColor: '#f5f5f5'
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  avatarSmall: {
    width: 38,
    height: 38,
    borderRadius: 19
  },
  avatarMedium: {
    width: 52,
    height: 52,
    borderRadius: 26
  },
  postUserBlock: {
    flex: 1,
    marginLeft: 10
  },
  username: {
    color: '#111',
    fontSize: 14,
    fontWeight: '700'
  },
  mutedText: {
    color: '#777',
    fontSize: 12
  },
  postImage: {
    width: '100%',
    aspectRatio: 1
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 10,
    gap: 18
  },
  actionIcon: {
    fontSize: 27,
    color: '#111'
  },
  bookmarkIcon: {
    marginLeft: 'auto',
    fontSize: 25,
    color: '#111'
  },
  postBody: {
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 14,
    gap: 4
  },
  boldText: {
    color: '#111',
    fontWeight: '800'
  },
  caption: {
    color: '#111',
    fontSize: 14,
    lineHeight: 20
  },
  followPill: {
    minWidth: 88,
    height: 34,
    borderRadius: 7,
    backgroundColor: '#0095f6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12
  },
  followingPill: {
    backgroundColor: '#efeff4'
  },
  followPillText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800'
  },
  followingPillText: {
    color: '#111'
  },
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 72,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#d9d9d9',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 8
  },
  tabButton: {
    width: 64,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  tabButtonActive: {
    backgroundColor: '#f1f8ff'
  },
  tabIcon: {
    color: '#333',
    fontSize: 21,
    lineHeight: 24
  },
  tabIconActive: {
    color: '#0095f6',
    fontWeight: '900'
  },
  tabLabel: {
    marginTop: 2,
    color: '#555',
    fontSize: 10,
    fontWeight: '700'
  },
  tabLabelActive: {
    color: '#0095f6'
  },
  searchBox: {
    width: 112,
    height: 34,
    borderRadius: 7,
    backgroundColor: '#efeff4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 4
  },
  searchIcon: {
    color: '#777',
    fontSize: 17
  },
  searchPlaceholder: {
    color: '#777',
    fontSize: 13,
    fontWeight: '600'
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  sectionTitle: {
    fontSize: 17,
    color: '#111',
    fontWeight: '800'
  },
  sectionHint: {
    fontSize: 12,
    color: '#777',
    fontWeight: '700'
  },
  personRow: {
    minHeight: 74,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  personText: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10
  },
  reasonText: {
    marginTop: 3,
    color: '#8a8a8a',
    fontSize: 12
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    paddingTop: 2
  },
  gridImage: {
    width: '32.95%',
    aspectRatio: 1,
    backgroundColor: '#eee'
  },
  formContent: {
    padding: 16,
    paddingBottom: 96
  },
  composerPreview: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: '#eee'
  },
  captionInput: {
    minHeight: 110,
    marginTop: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 8,
    color: '#111',
    fontSize: 15,
    textAlignVertical: 'top'
  },
  composerTools: {
    marginTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#dedede'
  },
  settingRow: {
    height: 52,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dedede',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  settingText: {
    color: '#111',
    fontSize: 15,
    fontWeight: '600'
  },
  settingArrow: {
    color: '#8a8a8a',
    fontSize: 28
  },
  primaryButton: {
    height: 48,
    marginTop: 22,
    borderRadius: 8,
    backgroundColor: '#0095f6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800'
  },
  reelsHeader: {
    position: 'absolute',
    top: 48,
    left: 16,
    right: 16,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  reelsTitle: {
    color: '#fff',
    fontSize: 27,
    fontWeight: '900'
  },
  reelsCamera: {
    color: '#fff',
    fontSize: 25
  },
  reelCard: {
    height: 720,
    backgroundColor: '#050505'
  },
  reelImage: {
    width: '100%',
    height: '100%'
  },
  reelOverlay: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 104,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  reelCreator: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '900'
  },
  reelCaption: {
    marginTop: 8,
    color: '#fff',
    fontSize: 16,
    fontWeight: '700'
  },
  reelMeta: {
    marginTop: 6,
    color: '#ededed',
    fontSize: 13
  },
  reelActions: {
    alignItems: 'center',
    gap: 20
  },
  reelAction: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800'
  },
  profileTop: {
    paddingHorizontal: 16,
    paddingTop: 18,
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileAvatar: {
    width: 92,
    height: 92,
    borderRadius: 46
  },
  statRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 18
  },
  stat: {
    width: 76,
    alignItems: 'center'
  },
  statValue: {
    color: '#111',
    fontSize: 18,
    fontWeight: '900'
  },
  statLabel: {
    marginTop: 2,
    color: '#444',
    fontSize: 12,
    fontWeight: '600'
  },
  profileBio: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 3
  },
  bioText: {
    color: '#222',
    fontSize: 14,
    lineHeight: 20
  },
  linkText: {
    color: '#064f9e',
    fontSize: 14,
    fontWeight: '700'
  },
  profileButtons: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 14
  },
  profileButton: {
    flex: 1,
    height: 36,
    borderRadius: 7,
    backgroundColor: '#efeff4',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileButtonText: {
    color: '#111',
    fontSize: 13,
    fontWeight: '800'
  },
  suggestionRail: {
    paddingHorizontal: 12,
    gap: 10
  },
  suggestionCard: {
    width: 138,
    minHeight: 176,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  suggestionAvatar: {
    width: 62,
    height: 62,
    borderRadius: 31
  },
  suggestionReason: {
    minHeight: 32,
    color: '#888',
    fontSize: 11,
    textAlign: 'center'
  },
  profileTabs: {
    marginTop: 18,
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#dedede',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dedede'
  },
  profileTab: {
    flex: 1,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#111'
  },
  profileTabText: {
    color: '#777',
    fontSize: 13,
    fontWeight: '800'
  },
  profileTabTextActive: {
    color: '#111'
  },
  reelsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    paddingTop: 2
  },
  miniReel: {
    width: '32.95%',
    aspectRatio: 0.62,
    backgroundColor: '#111'
  },
  miniReelImage: {
    width: '100%',
    height: '100%'
  },
  miniReelText: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    color: '#fff',
    fontSize: 12,
    fontWeight: '800'
  },
  listHeader: {
    minHeight: 58,
    paddingHorizontal: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dedede',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  listTitle: {
    color: '#111',
    fontSize: 18,
    fontWeight: '900'
  },
  listContent: {
    paddingBottom: 32
  },
  emptyState: {
    padding: 30,
    alignItems: 'center'
  },
  emptyTitle: {
    color: '#111',
    fontSize: 17,
    fontWeight: '900'
  },
  emptyText: {
    marginTop: 6,
    color: '#777',
    fontSize: 13,
    textAlign: 'center'
  }
});
