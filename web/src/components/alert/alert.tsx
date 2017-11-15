import * as React from 'react';
import { FontIcon } from '../ui/icons';

const AUTO_HIDE_TIME_MS = 5000;

interface Props {
  children?: any;
  autoHide: boolean;
  onClose: Function;
  type?: 'success' | 'error';
}

export default class Alert extends React.Component<Props, {}> {
  static defaultProps = {
    type: 'success',
  };

  timeout: number;

  constructor(props: Props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.startTimer({}, props);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.startTimer(this.props, nextProps);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  private startTimer(prevProps: any, { autoHide, onClose }: Props) {
    if (autoHide && autoHide !== prevProps.autoHide) {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(onClose, AUTO_HIDE_TIME_MS);
    }

    if (!autoHide) {
      clearTimeout(this.timeout);
    }
  }

  private onClick() {
    clearTimeout(this.timeout);
    this.props.onClose();
  }

  render() {
    return (
      <div className={'alert ' + this.props.type}>
        {this.props.children}

        <FontIcon type="x" onClick={this.onClick} className="icon" />
      </div>
    );
  }
}
