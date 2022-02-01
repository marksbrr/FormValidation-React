/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import './form.scss';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import Dropdown from '../dropdown/dropdown';

type FormValues = {
email: string,
cardNumber: number,
cardExpiration: number,
cardSecurity: number,
nameOnCard: string,
country: string,
}

type FormProps = {
  onSubmit: () => void;
}

const Form: FC<FormProps> = ({ onSubmit }) => {
  const [selectOption, setSelectOption] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const handleTheSubmit = () => {
    window.location.reload();
    alert('It works!');
  };

  return (
    <section>
      <div className="form-container">
        <form onSubmit={handleSubmit(() => {})}>
          <div className="form-wrapper">
            <h1 className="form-header form-text">Buy a Teddy Bear</h1>

            <h4 className="form-text">E-mail</h4>

            <input
              {...register('email',
                {
                  required: 'An email is required!',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid e-mail format' },
                })}
              type="text"
              className="form-input"
              placeholder="E-mail"
            />
            {errors.email && <span className="required-text">{errors.email.message}</span>}

            <h4 className="form-text">Card information</h4>

            <input
              {...register('cardNumber',
                {
                  required: 'Card number is required!',
                  minLength: { value: 16, message: '16 digits required!' },
                  maxLength: { value: 16, message: '16 digits required!' },
                })}
              type="number"
              className="form-input"
              placeholder="0000 0000 0000 0000"
            />
            {errors.cardNumber && <span className="required-text">{errors.cardNumber.message}</span>}

            <div className="form-card-backside">
              <div className="form-card-backside-wrapper">

                <input
                  {...register('cardExpiration', {
                    required: 'Expiration date required!',
                    pattern: { value: /^(0[1-9]|1[0-2])\/\d{2}$/, message: 'Invalid date format!' },
                  })}
                  type="text"
                  className="form-input"
                  placeholder="MM/YY"
                />

                <input
                  {...register('cardSecurity',
                    {
                      required: 'CVC is required!',
                      minLength: { value: 3, message: 'CVC requires 3 digits!' },
                      maxLength: { value: 3, message: 'CVC requires 3 digits!' },
                    })}
                  type="number"
                  className="form-input"
                  placeholder="CVC"
                />
                {(errors.cardExpiration) && <span className="required-text">{errors.cardExpiration.message}</span>}
                {(errors.cardSecurity) && <span className="required-text">{errors.cardSecurity.message}</span>}

              </div>
            </div>

            <h4 className="form-text">Name on card</h4>

            <input
              {...register('nameOnCard',
                {
                  required: 'Please enter your name!',
                  pattern: { value: /[a-zA-Z]+/g, message: 'Please use only letters!' },
                  minLength: { value: 4, message: 'At least 4 characters required!' },
                  maxLength: { value: 24, message: 'Exceeded the maximum limit of 24 characters!' },
                })}
              type="text"
              className="form-input"
              placeholder="Name"
            />

            {errors.nameOnCard && <span className="required-text">{errors.nameOnCard.message}</span>}

            <Dropdown
              {...register('country', {
                // required: 'Please select a country!',
                value: selectOption,
              })}
              selectOption={selectOption}
              setSelectOption={setSelectOption}
            />

            {errors.country && <span className="required-select">{errors.country.message}</span>}

            <div className="form-button-container">

              <button
                className="form-button"
                type="submit"
                onClick={handleSubmit(() => {
                  alert('The form has been submitted');
                  handleTheSubmit();
                })}
              >
                Pay €55.00
              </button>

            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
