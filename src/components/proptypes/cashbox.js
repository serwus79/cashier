import PropTypes from "prop-types";

export const participatorPropType = PropTypes.shape({
  name: PropTypes.string,
  sent: PropTypes.bool,
  received: PropTypes.bool
});
export const costPropType = PropTypes.shape({
  name: PropTypes.string,
  price: PropTypes.number
});
export const cashboxPropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  desc: PropTypes.string,
  expire: PropTypes.number,
  participates: PropTypes.objectOf(participatorPropType),
  costs: PropTypes.objectOf(costPropType)
});
