import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    
  },
  formHeader: {
    fontSize: '2.5em',
    fontWeight: 'bold',
    marginBottom: '2em'
  },
  submitFormBtn: {
    display: 'block',
    margin: '0 auto'
  },
  'label-root': {
    marginLeft: '0.5em'
  },
  'label-shrink': {
    transform: 'translateY(-0.75em)'
  },
  'input-root': {
    marginBottom: '4em'
  },
  'input-input': {
    fontWeight: '600',
    padding: '0.75em 0.5em'
  },
  'helperText-root': {
    position: 'absolute',
    top: '4.5em',
    fontSize: '1em'
  }
}));

const useFormStyles = () => {
  const classes = useStyles();
  const textFieldProps = {
    InputProps: {
      classes: {
        root: classes['input-root'],
        input: classes['input-input']
      }
    },
    InputLabelProps: {
      classes: {
        root: classes['label-root'],
        shrink: classes['label-shrink']
      }
    },
    FormHelperTextProps: {
      classes: {
        root: classes['helperText-root']
      }
    }
  }

  return [classes, textFieldProps];
}

export default useFormStyles;