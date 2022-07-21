import './form.scss';
import { useForm } from 'react-hook-form';
import { ModalDialog } from 'components/modalDialog';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as Close } from 'assets/ic_close_24px.svg';
import { createPortal } from 'react-dom';
import classnames from 'classnames';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import { getItem, update } from 'requests/movieActions';
import { useEffect, useMemo } from 'react';
import { UpdateMovieDto } from 'interfaces/updateMovieDto';

interface FormInput {
    label: string;
    name: keyof UpdateMovieDto;
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

export const UpdateMovieModal = () => {
    const navigate = useNavigate();
    const params = useParams();
    const itemId = useMemo(() => params['id'], [params]);

    const { register, reset, formState: { errors }, setValue, handleSubmit } = useForm<UpdateMovieDto>({
        defaultValues: {},
        reValidateMode: 'onChange',
        mode: 'onBlur',
    });

    useEffect(() => {
        if (!itemId) return;

        getItem(itemId)
            .then((item) => {
                reset(item);
            });

    }, [itemId]);

    function onSubmit(data: UpdateMovieDto) {
        if (!itemId) return;
        update(itemId, data)
            .then(() => navigate('/home'));
    }

    return (
        createPortal(
            <ModalDialog
                title={'Update movie!'}
                onClose={() => navigate('/home')}
                close={<Close/>}
                closeOnBackClick={true}
                containerClassName={'add-movie-modal'}
            >
                {
                    itemId
                        ? <form className={'add-movie__form'}
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
                        : <p>NOT FOUND</p>
                }

            </ModalDialog>,
            document.getElementById('root') as HTMLDivElement,
        )
    );
};
