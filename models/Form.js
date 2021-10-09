const mongoose = require("mongoose");

const RowScehma = mongoose.Schema({
    id: {
        type: String
    },
    position: {
        type: Number
    },
    formId: {
        type: String
    },
    columns: {
        type: Array
    },
    colCount: {
        type: Number
    }
})

const ColumnScehma = mongoose.Schema({
    id: {
        type: String
    },
    position: {
        type: Number
    },
    formId: {
        type: String
    },

    label: {
        type: String
    },
    name: {
        type: String
    },
    options: {
        type: Array
    },
    type: {
        type: String
    },
})



const FormSchema = mongoose.Schema({
//   id: {
//       type: String
//   },
  user_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rows: {
    type: [RowScehma],
    required: true
  },
  columns: {
    type: [ColumnScehma],
    required: true
  },
});

FormSchema.virtual('id').get(function(){
    return this._id
});

FormSchema.set('toJSON', { getters: true, virtuals: true });

module.exports = mongoose.model("form", FormSchema);
