import React, {Component} from "react";
import Input from "./input";
import Button from "./btn";

class Inputs extends Component {

    render() {
        const {categories} = this.props;
        const inputs = categories.map(({id, title, title_ua}) => {
            return (
                <div key={id}>
                    <Input
                        name={"title_en"}
                        type={"text"}
                        placeholder={"title"}
                        value={title}
                    />
                    <Input
                        name={"title_ua"}
                        type={"text"}
                        placeholder={"title_ua"}
                        value={title_ua}
                    />
                    <Button
                        title={"Edit category"}
                        data={id}
                    />
                    <Button
                        title={"Remove category"}
                        data={id}
                    />
                </div>
            )
        });

        return (
            <div>
                {inputs}
            </div>
        );
    }
}

export default Inputs