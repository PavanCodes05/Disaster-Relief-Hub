const getInventory = async (req, res) => {
  try {
    const donor = req.user;
    const inventory = donor.inventory;
    res.status(200).json({ resources: inventory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addInventory = async (req, res) => {
  try {
    const { resource, quantity } = req.body;
    const donor = req.user;

    for (let i = 0; i < donor.inventory.length; i++) {
      if (donor.inventory[i].resource === resource) {
        donor.inventory[i].quantity += quantity;
        await donor.save();
        return res.status(200).json({ resources: donor.inventory });
      }
    }

    donor.inventory.push({ resource, quantity });

    await donor.save();

    return res.status(200).json({ resources: donor.inventory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInventory = async (req, res) => {
  try {
    const { resource } = req.body;
    const donor = req.user;
    const index = donor.inventory.findIndex(
      (item) => item.resource === resource
    );
    if (index === -1) {
      return res.status(404).json({ resources: donor.inventory });
      // return res.status(404).json({ message: "Resource not found" });
    }
    donor.inventory.splice(index, 1);
    await donor.save();

    res.status(200).json({ resources: donor.inventory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getInventory, addInventory, deleteInventory };
