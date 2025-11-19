import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CustomTabsProps {
  tabs: { key: string; label: string }[];
  activeTab: string;
  onChangeTab: (key: string) => void;
}

const CustomTabs = (props: CustomTabsProps) => {
  const { tabs, activeTab, onChangeTab } = props;
  return (
    <View style={styles.tabRow}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tabButton, activeTab === tab.key && styles.activeTab]}
          onPress={() => onChangeTab(tab.key)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: { fontSize: 16, color: '#666', fontWeight: '500' },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
  },
  activeTabText: {
    color: '#007bff',
    fontWeight: '700',
  },
});

export default CustomTabs;
