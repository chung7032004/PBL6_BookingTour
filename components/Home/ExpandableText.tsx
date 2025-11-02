import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

interface ExpandableTextProps {
  text?: string | null;
  limit?: number; // giới hạn ký tự
}

const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  limit = 100,
}) => {
  const [expanded, setExpanded] = useState(false);
  const safeText = text ?? '';
  return (
    <View>
      <Text style={styles.descriptionTour}>
        {expanded ? (
          <>
            {safeText}{' '}
            <Text style={styles.seeMore} onPress={() => setExpanded(false)}>
              Thu gọn
            </Text>
          </>
        ) : (
          <>
            {safeText.slice(0, limit)}
            {safeText.length > limit && (
              <>
                ...{' '}
                <Text style={styles.seeMore} onPress={() => setExpanded(true)}>
                  Xem thêm
                </Text>
              </>
            )}
          </>
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionTour: {
    fontSize: 14,
    color: '#333',
  },
  seeMore: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default ExpandableText;
