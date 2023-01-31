const resolvers = {
  Query: {
    // @WORKSHOP 2.3.1: Create a Query resolver for order operation and return an order
    order(_, { id }, { dataSources }) {
      return dataSources.ordersAPI.getOrder(id);
    }

  },
  // @WORKSHOP 2.3.2: Add a reference resolver for Order Entity
  Order: {
    __resolveReference: (order, { dataSources }) => {
        return dataSources.ordersAPI.getOrder(order.id);
    },
    buyer: (root) => {
      // Take the customer id
      const customerId = root.customerId;
      // Return a object that has id assigned from the customer id
      return {
        id: customerId
      };
    },
    items: (root) => {
      const variantIds = root.variantIds;
      const items = [];
      // iterate through product ids and assign the id
      for (let index = 0; index < variantIds.length; index++) {
        const item = {
          id: variantIds[index]
        };
        items.push(item);
      }
      return items;
}

  
  }
  
};

module.exports = resolvers;
