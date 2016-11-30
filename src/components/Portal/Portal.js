/* @flow */

import {
  PureComponent,
  PropTypes,
} from 'react';
import { manager } from './PortalHost';

export type PortalProps = {
   children: any;
   position: number;
}

type Props = PortalProps;

/**
 * Portal allows to render a component at a different place in the parent tree.
 */
export default class Portal extends PureComponent<void, Props, void> {
  static propTypes = {
    /**
     * Position of the element in the z-axis
     */
    position: PropTypes.number,
    children: PropTypes.node.isRequired,
  };

  static contextTypes = {
    [manager]: PropTypes.object,
  };

  componentDidMount() {
    if (typeof this.context[manager] !== 'object' || this.context[manager] === null) {
      throw new Error(
        'Couldn\'t find portal manager in the context or props. ' +
        'You need to wrap your root component in \'<PortalHost />\''
      );
    }
    this._key = this.context[manager].mount(this.props);
  }

  componentDidUpdate() {
    this.context[manager].update(this._key, this.props);
  }

  componentWillUnmount() {
    this.context[manager].unmount(this._key);
  }

  _key: ?string;

  render() {
    return null;
  }
}
