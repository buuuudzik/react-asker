import React from 'react';

import styles from './styles.css'

class Prompt extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          value: props.defaultValue
      };
  }

  changeState = e => {
      this.setState({ value: e.target.value });
  }

  componentDidUpdate(prevProps) {
      if (prevProps.defaultValue !== this.props.defaultValue) this.setState({ value: this.props.defaultValue });
  }

  render() {
      const { className, style, title, description, onAccept, onCancel, acceptCaption, cancelCaption, allowEmpty } = this.props;

      return <div className={className} style={style}>
          {title ? <div className="modal__title">{title}</div> : null}
          <div className="modal__content">
              {description ? <div className="modal__description">{description}</div> : null}
              <div className="modal__input">
                  <input value={this.state.value} onChange={this.changeState} />
              </div>
              <div className="modal__buttons">
                  {allowEmpty && this.state.value === "" ? null :
                      <div className="modal__accept-button" onClick={() => onAccept(this.state.value)}>{acceptCaption}</div>
                  }
                  <div className="modal__cancel-button" onClick={onCancel}>{cancelCaption}</div>
              </div>
          </div>
      </div>;
  }
}

// Singleton
class Asker {
  constructor(viewKey) {
      this.component = null;
      this.element = null;
      this.viewKey = viewKey;
  }

  connectView = component => {
      this.component = component;
      this.updateView();
  }

  disconnectView = () => {
      this.component = null;
  }

  updateView = () => {
      if (this.component) this.component.setState({ [this.viewKey]: this.element ? { ...this.element } : null });
  }

  add = el => {
      if (!el.onAccept) return console.log("Asker element without onAccept method!", el);
      if (el.onAccept) {
          const onAccept = el.onAccept;
          el.onAccept = (...args) => {
              onAccept(...args);
              this.close(el.id);
          };
      }
      this.element = el;
      this.updateView();
  }

  close = () => {
      this.element = null;
      this.updateView();
  }

  prompt({ title, description, defaultValue, onAccept, acceptCaption = "zapisz", cancelCaption = "porzuć", allowEmpty = false, decoration }) {
      this.add({
          type: "prompt",
          title,
          description,
          defaultValue,
          onAccept,
          acceptCaption,
          cancelCaption,
          allowEmpty,
          decoration,
      });
  }

  confirm({ title = "Czy jesteś tego pewny?", description, onAccept, acceptCaption = "tak", cancelCaption = "nie", decoration }) {
      this.add({
          type: "confirm",
          title,
          description,
          onAccept,
          acceptCaption,
          cancelCaption,
          decoration,
      });
  }
}

const asker = new Asker("modal");

class AskerView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { modal: null };
    }

    componentDidMount() { asker.connectView(this); }
    componentWillUnmout() { asker.disconnectView(this); }

    render() {
        const { modal } = this.state;

        if (!modal) return null;

        const zIndex = this.props.zIndex || 10000;
        let className = "modal";
        if (modal.decoration) className += ` modal-${modal.decoration}`;

        switch (modal.type) {
            case "confirm":
                return <div className={className} style={{ zIndex }}>
                    <div className="modal__title">{modal.title}</div>
                    <div className="modal__content">
                        <div className="modal__description">{modal.description}</div>
                        <div className="modal__buttons">
                            <div className="modal__accept-button" onClick={modal.onAccept}>{modal.acceptCaption}</div>
                            <div className="modal__cancel-button" onClick={asker.close}>{modal.cancelCaption}</div>
                        </div>
                    </div>
                </div>
                break;
            case "prompt":
                return <Prompt
                    className={className}
                    style={{ zIndex }}
                    title={modal.title}
                    description={modal.description}
                    defaultValue={modal.defaultValue}
                    onAccept={modal.onAccept}
                    onCancel={asker.close}
                    acceptCaption={modal.acceptCaption}
                    cancelCaption={modal.cancelCaption}
                />
                break;
            default: return null;
        }
    }
}

export { AskerView, asker };