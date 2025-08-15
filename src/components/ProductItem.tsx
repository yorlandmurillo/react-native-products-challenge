import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductItem = ({ item, pressGoToDetails }: any) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          pressGoToDetails(item.id);
        }}
      >
        <View style={styles.leftColumn}>
          <Image source={{ uri: item.thumbnail }} style={styles.image} />
        </View>

        <View style={styles.rightColumn}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.rating}>Rating {item.rating}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  leftColumn: {
    width: '35%',
    backgroundColor: '#f5f5f5',
  },
  rightColumn: {
    width: '65%',
    padding: 10,
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    height: 80,
    justifyContent: 'center',
  },
  titleScreen: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#28a745',
  },
  rating: {
    fontSize: 12,
    fontWeight: '300',
  },
});

export default ProductItem;
