const EmptyListResults = {
  product_ingredients: [
    {
      id: null,
      main_name: null,
      hazard: {
        ingredient_hazard_avg: null
      }
    }
  ],
  product_hazard_avg: null,
  detail_hazard_product: [
    {
      id: null,
      abbreviation: null,
      description: null,
      hazard_category: null,
      hazard_class: null,
      hazard_scale_score: null,
      num_of_ingredients: null
    }
  ]
}

const EmptyIngredient = {
  ingredient: {
    id: null,
    main_name: null,
    e_number: null,
    functions: [],
    pubchem_cid: null,
    cas_numbers: [],
    ec_numbers: [],
    colour_index: null,
    description: null,
    request_statistics: null,
    hazard: {
      hazard_ghs_set: [
        {
          id: null,
          hazard_class: null,
          abbreviation: null,
          hazard_category: null,
          ghs_code: null,
          description: null,
          hazard_scale_score: null,
          number_of_notifiers: null,
          percent_notifications: null
        },
      ],
      ingredient_hazard_avg: null,
      total_notifications: null,
      sourse: null,
      cl_inventory_id: null
    }
  }
};

export {
  EmptyListResults,
  EmptyIngredient
}
