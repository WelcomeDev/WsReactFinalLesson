import './form.scss';
import { useForm } from 'react-hook-form';
import { CreateMovieDto } from 'interfaces/createMovieDto';
import { ModalDialog } from 'components/modalDialog';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Close } from 'assets/ic_close_24px.svg';
import { createPortal } from 'react-dom';
import classnames from 'classnames';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import { create } from 'requests/movieActions';

interface FormInput {
    label: string;
    name: keyof CreateMovieDto;
    type?: string;
    validation?: RegisterOptions;
}

const formInputs: FormInput[] = [
    {
        label: 'Title',
        name: 'title',
        validation: {
            required: {
                value: true,
                message: 'This field is required',
            },
            pattern: {
                value: /\w{1,30}/,
                message: 'Invalid',
            },
        },
    },
    {
        label: 'Rate movie',
        name: 'rate',
        validation: {
            required: {
                value: true,
                message: 'This field is required',
            },
            min: 0,
            max: 5,
            valueAsNumber: true,
        },
    },
    {
        label: 'Leave your comment',
        name: 'comment',
        type: 'textarea',
    },
    {
        label: 'Premier date',
        name: 'date',
        type: 'date',
        validation: {
            required: {
                value: true,
                message: 'This field is required',
            },
        },
    },
];

export const CreateMovieModal = () => {
    const navigate = useNavigate();

    const { register, formState: { errors }, handleSubmit } = useForm<CreateMovieDto>({
        defaultValues: {},
        reValidateMode: 'onChange',
        mode: 'onBlur',
    });

    function onSubmit(data: CreateMovieDto) {
        create(data)
            .then(() => navigate('/home'));
    }

    return (
        createPortal(
            <ModalDialog
                title={'Create new movie!'}
                onClose={() => navigate('/home')}
                close={<Close/>}
                closeOnBackClick={true}
                containerClassName={'add-movie-modal'}
            >
                <form className={'add-movie__form'}
                      onSubmit={handleSubmit(onSubmit)}
                >
                    {
                        formInputs.map((item, index) => {
                            switch (item.type) {
                            case undefined:
                                return <>
                                    <input
                                        className={'create-movie-input'}
                                        placeholder={item.label}
                                        {...register(item.name, item.validation)}
                                    />
                                    {
                                        errors[item.name]?.message &&
                                        <p className="error">
                                            {errors[item.name]?.message}
                                        </p>
                                    }
                                </>;
                            case 'textarea':
                                return (
                                    <textarea
                                        className={'create-movie-input'}
                                        placeholder={errors[item.name]?.message ?? item.label}
                                        {...register(item.name, item.validation)}
                                    />
                                );
                            case 'date':
                                return <input
                                    type={'date'}
                                    className={'create-movie-input'}
                                    {...register(item.name, item.validation)}
                                />;
                            }

                        })
                    }
                    <div className={'form-filler'}></div>
                    <button className={classnames('primary-button')}>
                        Submit
                    </button>
                </form>
            </ModalDialog>,
            document.getElementById('root') as HTMLDivElement,
        )
    );
};
