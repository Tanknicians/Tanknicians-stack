import { useState } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { Modal, Portal, Text } from 'react-native-paper';
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR
} from '../types/Styling';

const OfflineSCUploadModal = ({ formTotal }: { formTotal: number | null }) => {
  const [visible, setVisible] = useState(true);

  // Dismiss keyboard when modal is visible
  Keyboard.dismiss();

  if (formTotal === 0 || formTotal === null) return null;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        contentContainerStyle={styles.container}
      >
        <Text variant='headlineSmall' style={styles.header}>
          Local Forms Submitted Successfully{'\n'}
          <Text variant='titleLarge' style={styles.bodyText}>
            Total: {formTotal}
          </Text>
        </Text>
      </Modal>
    </Portal>
  );
};

export default OfflineSCUploadModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: SECONDARY_COLOR,
    padding: 10,
    paddingVertical: 12,
    margin: 12,
    borderRadius: 5,
    borderWidth: 1.5
  },
  header: {
    color: TERTIARY_COLOR,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  bodyText: { textAlign: 'center', color: TERTIARY_COLOR }
});
