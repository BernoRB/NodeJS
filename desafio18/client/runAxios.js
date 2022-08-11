const { getAll, postNew, updateOne, deleteOne } = require('./axios');


(async () => {
    await getAll()
    await postNew()
    await updateOne()
    await deleteOne()
  })()