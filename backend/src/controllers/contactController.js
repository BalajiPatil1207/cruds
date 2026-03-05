const errorHandler = require("../helper/errorHandler");
const CONTACT_MODEL = require("../models/contactModel");

const contactDetails = async (req, res) => {
  try {

    const contacts = await CONTACT_MODEL.findAll();

    return res.status(200).json({
      success: true,
      data: contacts
    });

  } catch (error) {

    const errors = errorHandler(error);

    return res.status(500).json({
      success: false,
      error: errors.message
    });
  }
};

const contactFind = async (req, res) => {
  try {

    const contact = await CONTACT_MODEL.findByPk(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found!"
      });
    }

    return res.status(200).json({
      success: true,
      data: contact
    });

  } catch (error) {

    const errors = errorHandler(error);

    return res.status(500).json({
      success: false,
      error: errors.message
    });
  }
};

const contactStore = async (req, res) => {
  try {

    const contact = await CONTACT_MODEL.create(req.body);

    return res.status(201).json({
      success: true,
      data: contact
    });

  } catch (error) {

    const errors = errorHandler(error);

    return res.status(500).json({
      success: false,
      error: errors.message
    });
  }
};

const contactUpdate = async (req, res) => {
  try {

    const contact = await CONTACT_MODEL.findByPk(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found!"
      });
    }

    await contact.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Contact updated successfully"
    });

  } catch (error) {

    const errors = errorHandler(error);

    return res.status(500).json({
      success: false,
      error: errors.message
    });
  }
};

const contactDelete = async (req, res) => {
  try {

    const contact = await CONTACT_MODEL.findByPk(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found!"
      });
    }

    await contact.destroy();

    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully"
    });

  } catch (error) {

    const errors = errorHandler(error);

    return res.status(500).json({
      success: false,
      error: errors.message
    });
  }
};

module.exports = {
  contactDetails,
  contactFind,
  contactStore,
  contactUpdate,
  contactDelete,
};