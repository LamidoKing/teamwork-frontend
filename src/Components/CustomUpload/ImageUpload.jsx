/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import React from "react"
import PropTypes from "prop-types"
import Button from "../CustomButtons/Button"

import defaultImage from "../../Style/img/image_placeholder.jpg"
import defaultAvatar from "../../Style/img/placeholder.jpg"

const defaultProps = {
  avatar: null
}

const propTypes = {
  avatar: PropTypes.oneOfType([PropTypes.object]),
  addButtonProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
  changeButtonProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
  removeButtonProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
  handleClearGif: PropTypes.func.isRequired,
  handleGifInput: PropTypes.func.isRequired
}

class ImageUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage
    }
    this.handleImageChange = this.handleImageChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleImageChange(e) {
    e.preventDefault()
    const reader = new FileReader()
    const file = e.target.files[0]

    this.props.handleGifInput(e)
    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result
      })
    }
    reader.readAsDataURL(file)
  }

  handleClick() {
    this.fileInput.click()
  }

  handleRemove() {
    const { avatar, handleClearGif } = this.props
    this.setState({
      file: null,
      imagePreviewUrl: avatar ? defaultAvatar : defaultImage
    })
    this.fileInput.value = null
    handleClearGif()
  }

  render() {
    const {
      avatar,
      addButtonProps,
      changeButtonProps,
      removeButtonProps
    } = this.props
    return (
      <div className="fileinput text-center">
        <input
          type="file"
          onChange={this.handleImageChange}
          ref={c => {
            this.fileInput = c
          }}
        />
        <div className={`thumbnail${avatar ? " img-circle" : ""}`}>
          <img src={this.state.imagePreviewUrl} alt="..." />
        </div>
        <div>
          {this.state.file === null ? (
            <Button {...addButtonProps} onClick={() => this.handleClick()}>
              {avatar ? "Add Photo" : "Select image"}
            </Button>
          ) : (
            <span>
              <Button {...changeButtonProps} onClick={() => this.handleClick()}>
                Change
              </Button>
              {avatar ? <br /> : null}
              <Button
                {...removeButtonProps}
                onClick={() => this.handleRemove()}
              >
                <i className="fas fa-times" /> Remove
              </Button>
            </span>
          )}
        </div>
      </div>
    )
  }
}

ImageUpload.defaultProps = defaultProps

ImageUpload.propTypes = propTypes

export default ImageUpload
